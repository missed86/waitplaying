from rest_framework import serializers

from .models.game import Game
# from .models.company import Company
# from .models.platform import Platform
# from .models.release_date import ReleaseDate
# from .models.cover import Cover
# from .models.screenshot import Screenshot

class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = ('__all__')
        # read_only_fields = ('__all__')