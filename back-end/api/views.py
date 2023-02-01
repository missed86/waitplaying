# from django.shortcuts import render

from api.models import Game  # , Company, Platform, ReleaseDate, Cover, Screenshot

from django.http import HttpResponse
from django.db.models import Count
from rest_framework import generics, viewsets, permissions, status, exceptions
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import GameSerializer, NextGamesSerializer
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
    print(datetime.now().timestamp())

    def get(self, request, format=None):
        queryset = Game.objects.filter(first_release_date__gte=int(datetime.now().timestamp())).order_by(
            'first_release_date').values('first_release_date').annotate(total=Count('id')).distinct()
        dates = queryset.values_list('first_release_date', flat=True)[:10]
        # queryset = Game.objects.filter(first_release_date__gte=int(datetime.now().timestamp())).order_by(
        #     'first_release_date').values('first_release_date').annotate(total=Count('id'))
        # dates = queryset.values_list('first_release_date', flat=True).distinct()[:10]

        games_grouped = {}
        for date in dates:
            games_on_date = Game.objects.filter(first_release_date=date)
            games_grouped[date] = games_on_date

        serializer = self.serializer_class([{'first_release_date': date, 'games': games} for date, games in games_grouped.items()], many=True)
        return Response(serializer.data)
