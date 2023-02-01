from rest_framework import serializers

from .models import Game

class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = ('__all__')
        # read_only_fields = ('__all__')

class NextGamesSerializer(serializers.Serializer):
    first_release_date = serializers.IntegerField()
    games = serializers.SerializerMethodField()
    
    def get_games(self, instance):
        return GameSerializer(instance['games'], many=True).data