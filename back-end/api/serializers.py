from rest_framework import serializers

from .models import Game, Platform, ReleaseDate, Note, UserGameSet


class PlatformSerializer (serializers.ModelSerializer):
    class Meta:
        model = Platform
        fields = ('__all__')


class ReleaseDateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReleaseDate
        fields = ('game', 'platform', 'date')

# class GameSerializerStandard(serializers.ModelSerializer):
#     class Meta:
#         model = Game
#         fields = ('__all__')


class GameSerializer(serializers.ModelSerializer):
    platforms = PlatformSerializer(many = True)
    release_dates = ReleaseDateSerializer(many=True, source='releasedate_set')
    class Meta:
        model = Game
        fields = ('__all__')
        # read_only_fields = ('__all__')
    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['release_dates'] = ReleaseDateSerializer(instance.releasedate_set.all(), many=True).data
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