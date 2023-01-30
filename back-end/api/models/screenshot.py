from django.db import models


class Screenshot(models.Model):
    id = models.IntegerField(primary_key=True)
    alpha_channel = models.BooleanField(default=False)
    animated = models.BooleanField(default=False)
    game = models.ForeignKey('Game', related_name='game_screenshot', on_delete=models.SET_NULL, null=True, blank=True)
    image_id = models.CharField(max_length=255)
