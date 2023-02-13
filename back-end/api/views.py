# from django.shortcuts import render
from itertools import groupby
from api.models import Game, ReleaseDate, Platform  # , Company, Cover, Screenshot

from django.http import HttpResponse
from django.db.models import Count, Prefetch
from rest_framework import generics, viewsets, permissions, serializers, exceptions
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import GameSerializer, NextGamesSerializer, GameDatesSerializer, SimpleGame
from datetime import datetime

from .scrapper import scrape_games, scrape_platforms, scrape_release_dates


def scrapping_view(request):
    scrape_platforms()
    scrape_games()
    scrape_release_dates()
    return HttpResponse("Scrapped")


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

        serializer = self.serializer_class([{'first_release_date': date, 'games': games} for date, games in games_grouped.items()], many=True)
        return Response(serializer.data)


def group_games(queryset, date):
  result = []
  queryset = queryset.values("game", "platform__abbreviation", "platform__alternative_name")
  queryset = sorted(queryset, key=lambda x: x["game"])
  for game, game_group in groupby(queryset, key=lambda x: x["game"]):
    platforms = []
    for x in game_group:
        if x["platform__abbreviation"] is not None:
            platforms.append(x["platform__abbreviation"])
        else:
            platforms.append(x["platform__alternative_name"])
    game = Game.objects.get(id=game)
    serializer = SimpleGame(game)
    result.append({"date": date, "game": serializer.data, "platforms": platforms})
  return result

# def group_games(queryset, date):
#     result = []
#     queryset = queryset.values("game", "platform__abbreviation", "platform__alternative_name")
#     queryset = sorted(queryset, key=lambda x: x["game"])
#     for game, game_group in groupby(queryset, key=lambda x: x["game"]):
#         platforms = [x["platform__abbreviation"] for x in game_group]
#         if platforms[0] is None:
#             print(platforms)
#         game = Game.objects.get(id=game)
#         serializer = SimpleGame(game)
#         result.append({"date": date, "game": serializer.data, "platforms": platforms})
#     return result

class GamesByDateView(APIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = GameDatesSerializer
    def get(self, request, date, format=None):
        date = self.kwargs.get("date")
        queryset = ReleaseDate.objects.filter(date=date)
        return Response(group_games(queryset, date))


# def group_games(queryset, date):
#     result = []
#     queryset = queryset.values("game", "platform__name")
#     queryset = sorted(queryset, key=lambda x: x["game"])
#     for game, game_group in groupby(queryset, key=lambda x: x["game"]):
#         platforms = [x["platform__name"] for x in game_group]
#         game = Game.objects.get(id=game)
#         serializer = SimpleGame(game)
#         result.append({"date": date, "game": serializer.data, "platforms": platforms})
#     return result

# class GamesByDateView(APIView):
#     permission_classes = [permissions.AllowAny]
#     serializer_class = GameDatesSerializer
#     def get(self, request, date, format=None):
#         date = self.kwargs.get("date")
#         queryset = ReleaseDate.objects.filter(date=date)
#         return Response(group_games(queryset, date))



# class GamesByDateView(APIView):
#     class SimpleGame(serializers.ModelSerializer):
        
#         class Meta:
#             model = Game
#             fields = ('__all__')
    
#     def get(self, request, date, format=None):
#         release_dates = ReleaseDate.objects.filter(date=date)
#         games = Game.objects.filter(releasedate__in=release_dates).distinct()
#         platforms = Platform.objects.filter(releasedate__in=release_dates).distinct()
#         platforms_serializer = PlatformSerializer(platforms, many=True)
#         games_serializer = self.SimpleGame(games, many=True)
        
#         return Response({'platforms': platforms_serializer.data , 'games': games_serializer.data})

        
# class GamesByDateView(generics.ListAPIView):
#     serializer_class = GameReleasedByDateSerializer
#     def get_queryset(self):
#         date = self.kwargs.get("date")
#         return ReleaseDate.objects.filter(date=date)
    # def get_queryset(self):
    #     release_dates = ReleaseDate.objects.values('date').distinct()
    #     result = []
    #     for release_date in release_dates:
    #         date = release_date['date']
    #         games = ReleaseDate.objects.filter(date=date).values('game__name').distinct()
    #         platforms = ReleaseDate.objects.filter(date=date).values('platform').distinct()
    #         result.append({'date': date, 'games': games, 'platforms': platforms})
    #     return result