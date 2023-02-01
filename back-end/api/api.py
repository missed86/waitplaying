from rest_framework import viewsets, permissions
from .serializers import GameSerializer

# from django.db.models import Count
from api.models import Game  # , Company, Platform, ReleaseDate, Cover, Screenshot
# from datetime import datetime


class GameViewSet(viewsets.ModelViewSet):
    queryset = Game.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = GameSerializer


