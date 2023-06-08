from django.urls import re_path, path, include
from rest_framework import routers
from .api import GameViewSet
from .views import (GameDetailsView, 
                    # NextGamesView, 
                    GamesByDateView, 
                    SearchBoxView, 
                    ServicesView, 
                    ServicesView2,
                    HomePageView,
                    ) 
from api.views import scrapping_view
from django.views.generic import RedirectView

urlpatterns = [
    path('', RedirectView.as_view(url='https://beta.waitplaying.com/')),
    path('games/<slug>/', GameDetailsView.as_view()),
    # path('releases/', GamesByDateView.as_view()),
    path('releases/<str:date>/', GamesByDateView.as_view()),
    # path('nextgames/', NextGamesView.as_view(), name='next-games'),
    path('search/', SearchBoxView.as_view(), name='search'),
    path('scrapping/', scrapping_view, name='scrapping'),
    path('services/', ServicesView.as_view(), name='services'),
    path('services2/', ServicesView2.as_view(), name='services2'),
    path('home/', HomePageView.as_view(), name='home'),
]