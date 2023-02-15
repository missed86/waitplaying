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

class SearchBoxView(generics.ListAPIView):
    serializer_class = GameSerializer

    def get_queryset(self):
        queryset = Game.objects.all().order_by('-first_release_date')
        query = self.request.GET.get("q")
        if query:
            queryset = queryset.filter(name__icontains = query)[:5]
        return queryset
