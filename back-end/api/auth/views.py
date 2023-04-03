from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import status, generics
from rest_framework.views import APIView
from api.models import Game

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.authentication import JWTAuthentication

from api.serializers import UserGameSetsSerializer, UserCalendarSerializer
from api.models import UserGameSet

import collections


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


class UserGameSetsView(APIView):
    serializer_class = UserGameSetsSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, game_id):
        user = request.user
        game = get_object_or_404(Game, id=game_id)
        # print(user, game)
        try:
            queryset = UserGameSet.objects.get(user=user, game=game)
        except UserGameSet.DoesNotExist:
            return Response({"detail": "Object not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = self.serializer_class(queryset)
        return Response(serializer.data)

    def post(self, request, game_id):
        data = request.data
        user = request.user
        game = get_object_or_404(Game, id=game_id)
        validator = {'user': user.id, 'game': game.id,
                     'mark': data['mark'], 'like': data['like']}
        # print(validator)
        try:
            user_game_set = UserGameSet.objects.get(user=user, game=game)
            serializer = UserGameSetsSerializer(user_game_set, data=validator)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except UserGameSet.DoesNotExist:
            user_game_set = UserGameSet(
                user=user, game=game, mark=data['mark'], like=data['like'])
            serializer = UserGameSetsSerializer(user_game_set, data=validator)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserCalendarView(APIView):
    serializer_class = UserCalendarSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        user_game_sets = UserGameSet.objects.filter(user=user, mark=True)
        serializer = self.serializer_class(user_game_sets, many=True)

        # Reorganizar el diccionario del serializador
        reorganized_data = {}
        tbd = set()
        for data in serializer.data:
            game = data['game']
            name = game['name']
            cover = game['cover']
            slug = game['slug']
            dates = game['release_dates']
            for date in dates:
                if date['category'] != 0:
                    tbd.add((name, cover, slug))
                    continue
                date_str = date['date']
                reorganized_data.setdefault(date_str, [])
                game_list = reorganized_data[date_str]
                is_game_exist = any(game['name'] == name for game in game_list)
                if not is_game_exist:
                    game_list.append({'name': name, 'cover': cover, 'slug': slug, 'category': date['category']})
                # if all(date['category'] == 0 for date in dates):
                #     tbd.append({'name': name, 'cover': cover, 'slug': slug})
        sorted_data = collections.OrderedDict(sorted(reorganized_data.items()))
        for date_str, games in sorted_data.items():
            sorted_games = sorted(games, key=lambda game: game['category'])
            sorted_data[date_str] = sorted_games
        tbd_list = list(tbd)
        sorted_data.update({'tbd': tbd_list})
        return Response(sorted_data)
