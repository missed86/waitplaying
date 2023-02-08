from django.db import models
from enum import Enum


class SUBSCRIPTIONS:
    GAMEPASSPC = "Game Pass PC"
    GAMEPASSCONSOLE = "Game Pass Console"
    PLAYSTATIONESSENTIAL = "PlayStation Essential"
    PLAYSTATIONEXTRA = "PlayStation Extra"
    EAPLAY = "EA Play"
    UBISOFTPLUS = "Ubisoft+"

class Subscription(models.Model):
    name = models.CharField(max_length=255, choices=[(tag.name, tag.value) for tag in SUBSCRIPTIONS])

class OnSubscription(models.Model):

    id = models.CharField(max_length=255, primary_key=True)
    game = models.ForeignKey(
        'Game', on_delete=models.SET_NULL, null=True, blank=True)
    console = models.BooleanField(default=False)
    pc = models.BooleanField(default=False)
    title = models.CharField(max_length=255)
    short_title = models.CharField(max_length=255)
    date = models.DateField(auto_now_add=True)
    active = models.BooleanField(default=True)
    subscriptions = models.ManyToManyField(Subscription)
    # subscription = models.IntegerField(
    #     choices=[(tag.name, tag.value) for tag in SUBSCRIPTIONS])    
