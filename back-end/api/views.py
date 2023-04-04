# from django.shortcuts import render
from itertools import groupby
# , Company, Cover, Screenshot
from api.models import Game, ReleaseDate, Platform, UserGameSet

from django.http import HttpResponse
from django.db.models import Count, Prefetch, F
from rest_framework import (generics,
                            viewsets,
                            permissions,
                            serializers,
                            exceptions)
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.contrib.auth import get_user_model


from .serializers import (
    GameSerializer,
    NextGamesSerializer,
    GameDatesSerializer,
    SimpleGame,
    UserGameSetsSerializer)
from datetime import datetime

from .scrapper import (scrape_games,
                       scrape_platforms,
                       scrape_release_dates)
from .utils.GPScrapper import GamepassScrape


def scrapping_view(request):
    scrape_platforms()
    scrape_games()
    scrape_release_dates()
    GamepassScrape()

    return HttpResponse("Scrapped")
    
def search_game(self, term):
    words = term.replace('®','').replace('™','').replace('!','').replace('?','').strip().split()
    matching_games = []
    while words:
        search_term = " ".join(words)
        matching_games = Game.objects.filter(name__icontains=search_term)
        if matching_games:
            break
        words.pop()
    return [game.id for game in matching_games]

class GameDetailsView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = GameSerializer

    def get_queryset(self):
        """
        Devuelve un queryset filtrado por `id` o `slug` según lo que se haya especificado en el URL.
        Si el valor especificado en el URL es un número entero, se filtra por el campo `id`.
        Si el valor especificado en el URL es una cadena, se filtra por el campo `slug`.
        """
        lookup = self.kwargs['slug']

        if lookup is not None:
            if lookup.isdigit():
                queryset = Game.objects.filter(id=lookup)
            else:
                queryset = Game.objects.filter(slug=lookup)
            if queryset.count() == 0:
                raise exceptions.NotFound()
        return queryset


class NextGamesView(APIView):
    serializer_class = NextGamesSerializer

    def get(self, request, format=None):
        queryset = Game.objects.filter(first_release_date__gte=datetime.now()).order_by(
            'first_release_date').distinct()[:10].values('first_release_date').annotate(total=Count('id'))
        dates = queryset.values_list('first_release_date', flat=True)

        games_grouped = {}
        for date in dates:
            games_on_date = Game.objects.filter(first_release_date=date)
            games_grouped[date] = games_on_date

        serializer = self.serializer_class(
            [{'first_release_date': date, 'games': games} for date, games in games_grouped.items()], many=True)
        return Response(serializer.data)



# def group_games(queryset, date):
#     result = []
#     queryset = queryset.values(
#         "game", "platform__abbreviation", "platform__alternative_name")
#     queryset = sorted(queryset, key=lambda x: x["game"])
#     for game, game_group in groupby(queryset, key=lambda x: x["game"]):
#         platforms = []
#         for x in game_group:
#             if x["platform__abbreviation"] is not None:
#                 platforms.append(x["platform__abbreviation"])
#             else:
#                 platforms.append(x["platform__alternative_name"])
#         game = Game.objects.get(id=game)
#         serializer = SimpleGame(game)
#         result.append(
#             {"date": date, "game": serializer.data, "platforms": platforms})
#     return result

def group_games(queryset, date, user):
    result = []
    queryset = queryset.values(
        "game", "platform__abbreviation", "platform__alternative_name")
    queryset = sorted(queryset, key=lambda x: x["game"])
    for game, game_group in groupby(queryset, key=lambda x: x["game"]):
        platforms = []
        for x in game_group:
            if x["platform__abbreviation"] is not None:
                platforms.append(x["platform__abbreviation"])
            else:
                platforms.append(x["platform__alternative_name"])
        game = Game.objects.get(id=game)
        if user is not None and user.is_authenticated:
            user_games = UserGameSet.objects.filter(
            user=user, game=game, mark=True)
            if user_games.exists():
                userSerializer = UserGameSetsSerializer(user_games, many=True)
                gameSerializer = SimpleGame(game)
                result.append(
                    {"date": date, "game": gameSerializer.data, "platforms": platforms, "mark": userSerializer.data[0]['mark']})
            else:
                serializer = SimpleGame(game)
                result.append(
                    {"date": date, "game": serializer.data, "platforms": platforms})
        else:
            serializer = SimpleGame(game)
            result.append(
                {"date": date, "game": serializer.data, "platforms": platforms})
    return result

class GamesByDateView(APIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = GameDatesSerializer
    authentication_classes = [JWTAuthentication]

    def get(self, request, date, format=None):
        date = self.kwargs.get("date")
        queryset = ReleaseDate.objects.filter(date=date, category=0)
        user = request.user if request.user.is_authenticated else None
        return Response(group_games(queryset, date, user))


# class GamesByDateView(APIView):
#     permission_classes = [permissions.AllowAny]
#     serializer_class = GameDatesSerializer

#     def get(self, request, date, format=None):
#         date = self.kwargs.get("date")
#         queryset = ReleaseDate.objects.filter(date=date)
#         return Response(group_games(queryset, date))


class SearchBoxView(generics.ListAPIView):
    serializer_class = GameSerializer

    def get_queryset(self):
        term = self.request.GET.get("q")
        words = term.replace('®','').replace('™','').replace('!','').replace('?','').strip().split()
        matching_games = []
        while words:
            search_term = " ".join(words)
            matching_games = Game.objects.filter(name__icontains=search_term)
            if matching_games:
                break
            words.pop()
        return matching_games.order_by('-first_release_date')

    
# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def getNotes(request):
#     user = request.user
#     notes = user.note_set.all()
#     serializer = NoteSerializer(notes, many=True)
#     return Response(serializer.data)
