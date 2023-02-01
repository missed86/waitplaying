# from django.shortcuts import render

from api.models import Game  # , Company, Platform, ReleaseDate, Cover, Screenshot

from django.http import HttpResponse
from rest_framework import generics, viewsets, permissions, status, exceptions
from rest_framework.response import Response
from .serializers import GameSerializer

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
