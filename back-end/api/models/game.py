from django.db import models
from enum import Enum


class CategoryEnum(Enum):
    main_game = 0
    dlc_addon = 1
    expansion = 2
    bundle = 3
    standalone_expansion = 4
    mod = 5
    episode = 6
    season = 7
    remake = 8
    remaster = 9
    expanded_game = 10
    port = 11
    fork = 12
    pack = 13
    update = 14


class Game(models.Model):
    id = models.IntegerField(primary_key=True)
    category = models.IntegerField(
        choices=[(tag.value, tag.name) for tag in CategoryEnum], null=True)
    cover = models.CharField(max_length=255, null=True)
    first_release_date = models.IntegerField(null=True)
    name = models.CharField(max_length=255, null=True)
    platforms = models.TextField(null=True)
    screenshots = models.TextField(null=True)
    # platforms = models.ManyToManyField(
    #     'Platform', related_name='game_platform', null=True)
    # screenshots = models.ManyToManyField(
    #     'Screenshot', related_name='game_screenshot', null=True)
    slug = models.CharField(max_length=255, null=True)
    storyline = models.TextField(null=True)
    summary = models.TextField(null=True)
    url = models.CharField(max_length=255, null=True)
    created_at = models.IntegerField(null=True)
    updated_at = models.IntegerField(null=True)
    # artworks = models.

