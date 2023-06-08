from rest_framework import serializers
from django.contrib.auth import get_user_model

from .models import Game, Platform, ReleaseDate, Note, UserGameSet, GamepassPCCatalog, GamepassConsoleCatalog, PsPlusCatalog


class PlatformSerializer (serializers.ModelSerializer):
    class Meta:
        model = Platform
        fields = ('__all__')


class ReleaseDateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReleaseDate
        fields = ('game', 'platform', 'date', 'category')



class GameSerializer(serializers.ModelSerializer):
    platforms = PlatformSerializer(many = True)
    release_dates = ReleaseDateSerializer(many=True, source='releasedate_set')
    class Meta:
        model = Game
        fields = ('__all__')
        ordering = ['platform','date']
        # read_only_fields = ('__all__')
    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['release_dates'] = ReleaseDateSerializer(instance.releasedate_set.all().order_by('date', 'platform'), many=True).data
        return data

class GameForSearch(serializers.ModelSerializer):
    platforms = PlatformSerializer(many = True)
    release_dates = ReleaseDateSerializer(many=True, source='releasedate_set')
    class Meta:
        model = Game
        fields = ('cover', 'name', 'slug', 'id', 'platforms', 'release_dates', 'first_release_date')
        ordering = ['platform','date']
        # read_only_fields = ('__all__')
    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['release_dates'] = ReleaseDateSerializer(instance.releasedate_set.all().order_by('date', 'platform'), many=True).data
        return data


class NextGamesSerializer(serializers.Serializer):
    
    first_release_date = serializers.DateField()
    games = serializers.SerializerMethodField()
    
    def get_games(self, instance):
        return GameSerializer(instance['games'], many=True).data



class SimpleGame(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = ('__all__')
class GamesForLists(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = ('id','name', 'slug', 'cover')




class GPCatalogSerializerPC(serializers.ModelSerializer):
    game = GamesForLists()
    class Meta:
        model = GamepassPCCatalog
        fields = ('game', 'start_date', 'end_date', 'id', 'active')
class GPCatalogSerializerConsole(serializers.ModelSerializer):
    game = GamesForLists()
    class Meta:
        model = GamepassConsoleCatalog
        fields = ('game', 'start_date', 'end_date', 'id', 'active')
class PSPCatalogSerializer(serializers.ModelSerializer):
    game = GamesForLists()
    class Meta:
        model = PsPlusCatalog
        fields = ('game', 'start_date', 'end_date', 'id', 'active')

''''''

class PlatformSerializerMini(serializers.ModelSerializer):
    class Meta:
        model = Platform
        fields = ('abbreviation','alternative_name','name','slug')
class GamesForFeatured(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = ('id','name', 'slug', 'cover', 'follows')
class GameForFeaturedReleases(serializers.ModelSerializer):
    game = GamesForFeatured()
    platform = PlatformSerializerMini()
    class Meta:
        model = ReleaseDate
        fields = ('date', 'platform', 'game')

''''''

class GameDatesSerializer(serializers.ModelSerializer):
    game = SimpleGame()
    platform = PlatformSerializer()
    class Meta:
        model = ReleaseDate
        fields = ('date', 'platform', 'game', 'games')
        # read_only_fields = ('__all__')

class UserGameSetsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserGameSet
        fields = '__all__'

class UserCalendarSerializer(serializers.ModelSerializer):
    class GameSubsetSerializer(GameSerializer):
        class Meta:
            model = Game
            fields = ('name', 'cover', 'slug', 'release_dates')
    game = GameSubsetSerializer()
    class Meta:
        model = UserGameSet
        fields = ('game',)

class UserSerializer(serializers.ModelSerializer):
    username = serializers.CharField(required=True)
    email = serializers.EmailField(required=True)
    password = serializers.CharField(required=True, write_only=True)

    class Meta:
        model = get_user_model()
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        user = get_user_model().objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
        )
        return user