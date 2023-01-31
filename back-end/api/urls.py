from django.urls import re_path
from rest_framework import routers
from .api import GameViewSet
from .views import GameDetailsView


router = routers.DefaultRouter()

router.register('api/games', GameViewSet, 'games')

urlpatterns = [
    re_path('^api/games/(?P<slug>.+)/$', GameDetailsView.as_view()),
]

urlpatterns += router.urls