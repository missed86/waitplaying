from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import status, generics
from rest_framework.views import APIView
from api.models import Game

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from api.serializers import UserGameSetsSerializer
from api.models import UserGameSet

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        # ...

        return token
    

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['GET'])
def getRoutes(request):
    routes = [
        'auth/token',
        'auth/token/refresh'
    ]

    return JsonResponse(routes, safe=False)


# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def getUserGameSets(request):
#     user = request.user
#     game = request.game
#     serializer = UserGameSetsSerializer(user, game)

# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
class UserGameSetsView(APIView):
    serializer_class = UserGameSetsSerializer

    def get(self, request, game_id):
        user = request.user.id
        try:
            queryset = UserGameSet.objects.get(user=user, game_id=game_id)
        except UserGameSet.DoesNotExist:
            return Response({"detail": "Object not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = self.serializer_class(queryset)
        return Response(serializer.data)

    def post(self, request, game_id):
        user = request.user.id
        game = get_object_or_404(Game, pk=game_id)
        try:
            user_game_set = UserGameSet.objects.get(user=user, game=game)
            serializer = self.serializer_class(user_game_set, data=request.data)
        except UserGameSet.DoesNotExist:
            serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save(user=user, game=game)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
