# from django.shortcuts import render
from itertools import groupby
# , Company, Cover, Screenshot
from api.models import (Game, ReleaseDate, Platform, UserGameSet,
                        GamepassPCCatalog, GamepassConsoleCatalog, PsPlusCatalog, Type)

from django.http import HttpResponse
from django.db.models import Count, Prefetch, F
from rest_framework import (generics,
                            viewsets,
                            permissions,
                            serializers,
                            exceptions,
                            status)
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.contrib.auth import get_user_model
from django.db.models import Q


from .serializers import (
    GameSerializer,
    NextGamesSerializer,
    GameDatesSerializer,
    SimpleGame,
    GamesForLists,
    UserGameSetsSerializer,
    GPCatalogSerializerPC,
    GPCatalogSerializerConsole,
    PSPCatalogSerializer,
    GameForSearch,
    GameForFeaturedReleases,
)
from datetime import datetime, date, timedelta


from api.global_functions import logger, Type
import api.main_scrapper as main_scrapper

cache_time = 60 * 60  # 1 hour




def scrapping_view(request):
    logger(Type.info, "scrapping_view", "View scrapping started")

    scrapped_dict = main_scrapper()

    logger(Type.info, "scrapping_view",
           "View scrapping finished: " + str(scrapped_dict))

    return HttpResponse("Scrapped")


def search_game(self, term):
    words = term.replace('®', '').replace('™', '').replace(
        '!', '').replace('?', '').strip().split()
    matching_games = []
    while words:
        search_term = " ".join(words)
        matching_games = Game.objects.filter(name__icontains=search_term)
        if matching_games:
            break
        words.pop()
    return [game.id for game in matching_games]


class GameDetailsView(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, *args, **kwargs):
        lookup = kwargs['slug']
        queryset = Game.objects.none()

        if lookup is not None:
            if lookup.isdigit():
                queryset = Game.objects.filter(id=lookup)
            else:
                queryset = Game.objects.filter(slug=lookup)

            if queryset.count() == 0:
                return Response(status=status.HTTP_404_NOT_FOUND)

        game_id = queryset.first().id if queryset.exists() else None

        if game_id is not None:
            gamepass_pc_queryset = GamepassPCCatalog.objects.filter(
                game=game_id)
            gamepass_console_queryset = GamepassConsoleCatalog.objects.filter(
                game=game_id)
            psplus_queryset = PsPlusCatalog.objects.filter(game=game_id)

            # Obtener los datos de las tablas extra
            gamepass_pc_data = GPCatalogSerializerPC(
                gamepass_pc_queryset.first()).data
            gamepass_console_data = GPCatalogSerializerConsole(
                gamepass_console_queryset.first()).data
            psplus_data = PSPCatalogSerializer(psplus_queryset.first()).data

            # Agregar los datos de las tablas extra a la respuesta
            response_data = GameSerializer(queryset.first()).data
            response_data['services'] = {
                'gamepass_pc': gamepass_pc_data,
                'gamepass_console': gamepass_console_data,
                'psplus': psplus_data
            }

            return Response(response_data)

        return Response(status=status.HTTP_404_NOT_FOUND)


# class NextGamesView(APIView):
#     serializer_class = NextGamesSerializer

#     def get(self, request, format=None):
#         queryset = Game.objects.filter(first_release_date__gte=datetime.now()).order_by(
#             'first_release_date').distinct()[:10].values('first_release_date').annotate(total=Count('id'))
#         dates = queryset.values_list('first_release_date', flat=True)

#         games_grouped = {}
#         for date in dates:
#             games_on_date = Game.objects.filter(first_release_date=date)
#             games_grouped[date] = games_on_date

#         serializer = self.serializer_class(
#             [{'first_release_date': date, 'games': games} for date, games in games_grouped.items()], many=True)
#         return Response(serializer.data)


def group_games(queryset, date, user):
    result = []
    queryset = queryset.values(
        "game", "platform__abbreviation", "platform__alternative_name")
    queryset = sorted(queryset, key=lambda x: x["game"])
    for game, game_group in groupby(queryset, key=lambda x: x["game"]):
        platforms = []
        for x in game_group:
            if x["platform__abbreviation"] is not None:
                platforms.append(x["platform__abbreviation"])
            else:
                platforms.append(x["platform__alternative_name"])
        game = Game.objects.get(id=game)
        if user is not None and user.is_authenticated:
            user_games = UserGameSet.objects.filter(
                user=user, game=game, mark=True)
            if user_games.exists():
                userSerializer = UserGameSetsSerializer(user_games, many=True)
                gameSerializer = GamesForLists(game)
                result.append(
                    {"date": date, "game": gameSerializer.data, "platforms": platforms, "mark": userSerializer.data[0]['mark']})
            else:
                serializer = GamesForLists(game)
                result.append(
                    {"date": date, "game": serializer.data, "platforms": platforms})
        else:
            serializer = GamesForLists(game)
            result.append(
                {"date": date, "game": serializer.data, "platforms": platforms})
    return result


class GamesByDateView(APIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = GameDatesSerializer
    authentication_classes = [JWTAuthentication]

    @method_decorator(cache_page(cache_time))
    def get(self, request, date, format=None):
        date = self.kwargs.get("date")
        queryset = ReleaseDate.objects.filter(date=date, category=0)
        user = request.user if request.user.is_authenticated else None
        return Response(group_games(queryset, date, user))


'''
Services Page
'''


class ServicesView(APIView):
    # permission_classes = [permissions.AllowAny]
    # serializer_class = SimpleGame
    # authentication_classes = [JWTAuthentication]

    def get(self, request):
        gamepass_pc_in = GamepassPCCatalog.objects.filter(
            active=True, game__isnull=False).order_by('-start_date').select_related('game')[:10]
        gamepass_pc_out = GamepassPCCatalog.objects.filter(
            active=False, game__isnull=False).order_by('-end_date').select_related('game')[:10]
        gamepass_console_in = GamepassConsoleCatalog.objects.filter(
            active=True, game__isnull=False).order_by('-start_date').select_related('game')[:10]
        gamepass_console_out = GamepassConsoleCatalog.objects.filter(
            active=False, game__isnull=False).order_by('-end_date').select_related('game')[:10]
        psplus_in = PsPlusCatalog.objects.filter(active=True, game__isnull=False).order_by(
            '-start_date').select_related('game')[:10]
        psplus_out = PsPlusCatalog.objects.filter(
            active=False, game__isnull=False).order_by('-end_date').select_related('game')[:10]

        gamepass_pc_in_serializer = GPCatalogSerializerPC(
            gamepass_pc_in, many=True)
        gamepass_console_in_serializer = GPCatalogSerializerConsole(
            gamepass_console_in, many=True)
        psplus_in_serializer = PSPCatalogSerializer(psplus_in, many=True)
        gamepass_pc_out_serializer = GPCatalogSerializerPC(
            gamepass_pc_out, many=True)
        gamepass_console_out_serializer = GPCatalogSerializerConsole(
            gamepass_console_out, many=True)
        psplus_out_serializer = PSPCatalogSerializer(psplus_out, many=True)

        response_data = {
            'gamepass_pc': {
                'in': gamepass_pc_in_serializer.data,
                'out': gamepass_pc_out_serializer.data,
            },
            'gamepass_console': {
                'in': gamepass_console_in_serializer.data,
                'out': gamepass_console_out_serializer.data,
            },
            'psplus': {
                'in': psplus_in_serializer.data,
                'out': psplus_out_serializer.data,
            }
        }

        return Response(response_data)


'''
Services Page v2
'''


class ServicesView2(APIView):
    # permission_classes = [permissions.AllowAny]
    # serializer_class = SimpleGame
    # authentication_classes = [JWTAuthentication]
    @method_decorator(cache_page(cache_time))
    def get(self, request):
        gamepass_pc_param = request.query_params.get('gamepass_pc')
        gamepass_console_param = request.query_params.get('gamepass_console')
        psplus_param = request.query_params.get('psplus')
        in_out_param = request.query_params.get('in_out')

        gamepass_pc_in = GamepassPCCatalog.objects.filter(
            active=True, game__isnull=False).order_by('-start_date').select_related('game')
        gamepass_pc_out = GamepassPCCatalog.objects.filter(
            active=False, game__isnull=False).order_by('-end_date').select_related('game')
        gamepass_console_in = GamepassConsoleCatalog.objects.filter(
            active=True, game__isnull=False).order_by('-start_date').select_related('game')
        gamepass_console_out = GamepassConsoleCatalog.objects.filter(
            active=False, game__isnull=False).order_by('-end_date').select_related('game')
        psplus_in = PsPlusCatalog.objects.filter(
            active=True, game__isnull=False).order_by('-start_date').select_related('game')
        psplus_out = PsPlusCatalog.objects.filter(
            active=False, game__isnull=False).order_by('-end_date').select_related('game')

        gamepass_pc_in_data = GPCatalogSerializerPC(
            gamepass_pc_in, many=True).data
        gamepass_pc_out_data = GPCatalogSerializerPC(
            gamepass_pc_out, many=True).data
        gamepass_console_in_data = GPCatalogSerializerConsole(
            gamepass_console_in, many=True).data
        gamepass_console_out_data = GPCatalogSerializerConsole(
            gamepass_console_out, many=True).data
        psplus_in_data = PSPCatalogSerializer(psplus_in, many=True).data
        psplus_out_data = PSPCatalogSerializer(psplus_out, many=True).data

        # Añadir propiedad "type" a las consultas "_in" y "_out"
        for game in gamepass_pc_in_data:
            game['type'] = 'in'
            game['service'] = 'gamepass_pc'
        for game in gamepass_console_in_data:
            game['type'] = 'in'
            game['service'] = 'gamepass_console'
        for game in psplus_in_data:
            game['type'] = 'in'
            game['service'] = 'psplus'
        for game in gamepass_pc_out_data:
            game['type'] = 'out'
            game['service'] = 'gamepass_pc'
        for game in gamepass_console_out_data:
            game['type'] = 'out'
            game['service'] = 'gamepass_console'
        for game in psplus_out_data:
            game['type'] = 'out'
            game['service'] = 'psplus'

        # Concatenar todas las listas de juegos y ordenar por fecha de entrada o salida
        # all_games = gamepass_pc_in_data + gamepass_pc_out_data + gamepass_console_in_data + gamepass_console_out_data + psplus_in_data + psplus_out_data

        if in_out_param == 'all':
            gamepass_pc_collection = gamepass_pc_in_data + gamepass_pc_out_data
            gamepass_console_collection = gamepass_console_in_data + gamepass_console_out_data
            psplus_collection = psplus_in_data + psplus_out_data
        elif in_out_param == 'in':
            gamepass_pc_collection = gamepass_pc_in_data
            gamepass_console_collection = gamepass_console_in_data
            psplus_collection = psplus_in_data
        elif in_out_param == 'out':
            gamepass_pc_collection = gamepass_pc_out_data
            gamepass_console_collection = gamepass_console_out_data
            psplus_collection = psplus_out_data

        all_games = []
        all_games += gamepass_pc_collection if gamepass_pc_param == 'true' else []
        all_games += gamepass_console_collection if gamepass_console_param == 'true' else []
        all_games += psplus_collection if psplus_param == 'true' else []

        all_games.sort(key=lambda game: game['start_date']
                       if game['type'] == 'in' else game['end_date'], reverse=True)

        # Establecer la fecha de actualización como la fecha actual

        for game in all_games:
            game['update_date'] = game['start_date'] if game['type'] == 'in' else game['end_date']

        response_data = all_games[:20]

        return Response(response_data)


'''
Searchbox
'''


class SearchBoxView(generics.ListAPIView):
    serializer_class = GameForSearch

    def get_queryset(self):
        term = self.request.GET.get("q")
        words = term.replace('®', '').replace('™', '').replace(
            '!', '').replace('?', '').strip().split()
        matching_games = []
        while words:
            search_term = " ".join(words)
            matching_games = Game.objects.filter(name__icontains=search_term)
            if matching_games:
                break
            words.pop()
        return matching_games.order_by('-first_release_date')[:50]


'''
Featured releases of the month
'''

def group_games_featured(data):
    result = {}
    for item in data:
        release_date = item['date']
        platform = item['platform']
        slug = item['game']['slug']
        follows = item['game']['follows']
        

        if slug not in result:
            result[slug] = {
                'slug': slug,
                'game': item['game'],
                'release_date': release_date,
                'platforms': [],
                'follows': follows
            }

        result[slug]['platforms'].append(platform)

    final_result = sorted(result.values(), key=lambda x: x['follows'], reverse=True)

    return final_result
    

'''Home page'''


class FeaturedReleasesView(APIView):
    # permission_classes = [permissions.AllowAny]
    # authentication_classes = [JWTAuthentication]
    serializer_class = GameForFeaturedReleases

    def get(self, request, format=None):
        today = datetime.today()
        start_of_month = today.replace(day=1)
        next_month = start_of_month.replace(month=start_of_month.month + 1)
        end_of_month = next_month - timedelta(days=1)

        queryset = ReleaseDate.objects.filter(
            Q(date__gte=start_of_month) & Q(date__lte=end_of_month),
            Q(game__first_release_date__gte=start_of_month) & Q(game__first_release_date__lte=end_of_month),
            category=0,
            game__follows__gt=0,
        )

        serializer = self.serializer_class(queryset, many=True)

        return group_games_featured(serializer.data)
class FeaturedNextMonthReleasesView(APIView):
    # permission_classes = [permissions.AllowAny]
    # authentication_classes = [JWTAuthentication]
    serializer_class = GameForFeaturedReleases

    def get(self, request, format=None):
        today = datetime.today()
        start_of_month = today.replace(day=1, month=today.month + 1)
        next_month = start_of_month.replace(month=start_of_month.month + 1)
        end_of_month = next_month - timedelta(days=1)

        queryset = ReleaseDate.objects.filter(
            Q(date__gte=start_of_month) & Q(date__lte=end_of_month),
            Q(game__first_release_date__gte=start_of_month) & Q(game__first_release_date__lte=end_of_month),
            category=0,
            game__follows__gt=0,
        )

        serializer = self.serializer_class(queryset, many=True)

        return group_games_featured(serializer.data)
class MostAnticipatedYear(APIView):
    # permission_classes = [permissions.AllowAny]
    # authentication_classes = [JWTAuthentication]
    serializer_class = GameForFeaturedReleases

    def get(self, request, format=None):
        today = datetime.today()
        start_on = today.replace(day=1, month=1)
        next_year = start_on.replace(year=start_on.year + 1)
        end_of_year = next_year - timedelta(days=1)

        queryset = ReleaseDate.objects.filter(
            Q(date__gte=start_on) & Q(date__lte=end_of_year),
            Q(game__first_release_date__gte=start_on) & Q(game__first_release_date__lte=end_of_year),
            category=0,
            game__follows__gt=0,
        )

        serializer = self.serializer_class(queryset, many=True)

        return group_games_featured(serializer.data)


class HomePageView(APIView):
    @method_decorator(cache_page(cache_time))
    def get(self, request, format=None):
        featured_release_data = FeaturedReleasesView().get(request)
        featured_next_month_data = FeaturedNextMonthReleasesView().get(request)
        most_anticipated_year_data = MostAnticipatedYear().get(request)
    
        combined_data = {
            'featured_releases': sorted(featured_release_data[:6], key=lambda x: x['release_date']),
            'featured_next_month': sorted(featured_next_month_data[:6], key=lambda x: x['release_date']),
            'most_anticipated_year': sorted(most_anticipated_year_data[:6], key=lambda x: x['release_date']),
        }

        return Response(combined_data)