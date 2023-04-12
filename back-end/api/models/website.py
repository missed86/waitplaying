from django.db import models
from enum import Enum


class CategoryEnum(Enum):
    official = 1
    wikia = 2
    wikipedia = 3
    facebook = 4
    twitter = 5
    twitch = 6
    instagram = 8
    youtube = 9
    iphone = 10
    ipad = 11
    android = 12
    steam = 13
    reddit = 14
    itch = 15
    epicgames = 16
    gog = 17
    discord = 18


class Website(models.Model):
    id = models.IntegerField(primary_key=True)
    game = models.ForeignKey(
        'Game', on_delete=models.SET_NULL, null=True, blank=True)
    trusted = models.BooleanField()
    url = models.CharField(max_length=255)
    category = models.IntegerField(
        choices=[(tag.value, tag.name) for tag in CategoryEnum])
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True)
