from django.urls import path
from . import views

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
from .views import UserCreateAPIView

urlpatterns = [
    path('', views.getRoutes),
    path('go/<int:game_id>/', views.UserGameSetsView.as_view(), name='game_options'),
    path('calendar/', views.UserCalendarView.as_view(), name='game_options'),
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', UserCreateAPIView.as_view(), name='register'),
]