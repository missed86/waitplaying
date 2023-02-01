from django.urls import re_path, path, include
from rest_framework import routers
from .api import GameViewSet
from .views import GameDetailsView, NextGamesView


router = routers.DefaultRouter()

router.register('games', GameViewSet, 'games')

urlpatterns = [
    re_path('^api/games/(?P<slug>.+)/$', GameDetailsView.as_view()),
    path('api/nextgames/', NextGamesView.as_view(), name='next-games'),
    path('api/', include(router.urls))
]