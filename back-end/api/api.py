from rest_framework import viewsets, permissions
from .serializers import GameSerializer

from django.db.models import Count
from api.models import Game #, Company, Platform, ReleaseDate, Cover, Screenshot
from datetime import datetime

class GameViewSet(viewsets.ModelViewSet):
    queryset = Game.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = GameSerializer


class NextGamesSet(viewsets.ModelViewSet):
    serializer_class = GameSerializer

    def get_queryset(self):
        queryset = Game.objects.filter(first_release_date__gte=int(datetime.now().timestamp())).order_by('first_release_date').values('first_release_date').annotate(total=Count('id'))[:10]

        games_grouped = {}
        for date_obj in queryset:
            first_release_date = date_obj['first_release_date']
            total = date_obj['total']
            games = Game.objects.filter(first_release_date=first_release_date)
            games_grouped[first_release_date] = {'total': total, 'games': games}

        return games_grouped