from django.urls import re_path, path, include
from rest_framework import routers
from .api import GameViewSet
from .views import GameDetailsView, NextGamesView, GamesByDateView


router = routers.DefaultRouter()

router.register('games', GameViewSet, 'games')

urlpatterns = [
    path('api/games/<slug>)/', GameDetailsView.as_view()),
    path('api/releases/<str:date>/', GamesByDateView.as_view()),
    path('api/nextgames/', NextGamesView.as_view(), name='next-games'),
    path('api/', include(router.urls))
]