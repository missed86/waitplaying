from rest_framework import serializers

from .models import Game, Platform, ReleaseDate


class PlatformSerializer (serializers.ModelSerializer):
    class Meta:
        model = Platform
        fields = ('__all__')


class ReleaseDateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReleaseDate
        fields = ('__all__')

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


class GameReleasedByDateSerializer(serializers.ModelSerializer):

    class GameInner(serializers.ModelSerializer):
        class Meta:
            model = Game
            fields = ('__all__')

    game = GameInner()

    class Meta:
        model = ReleaseDate
        fields = ('date', 'game')