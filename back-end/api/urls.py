from django.urls import re_path, path
from rest_framework import routers
from .api import GameViewSet, NextGamesSet
from .views import GameDetailsView


router = routers.DefaultRouter()

router.register('api/games', GameViewSet, 'games')

urlpatterns = [
    re_path('^api/games/(?P<slug>.+)/$', GameDetailsView.as_view()),
    path('nextgames/', NextGamesSet.as_view({'get': 'list'}), name='next-games'),
]

urlpatterns += router.urls