from django.db import models
from api.models import Game
from django.db.models import Q
from enum import Enum
import datetime

class GamepassCatalog(models.Model):
    name = models.CharField(null=False, unique=True, max_length=255)
    short_name = models.CharField(null=False, max_length=255, blank=True)
    slug_catalog = models.CharField(null=False, max_length=255)
    start_date = models.DateTimeField(null=False, blank=True, auto_now_add=True)
    end_date = models.DateTimeField(null=False, blank=True)
    active = models.BooleanField(default=True)
    pc = models.BooleanField(default=False)
    console = models.BooleanField(default=False)
    game = models.ForeignKey('Game', on_delete=models.SET_NULL, null=True, blank=True)
    updated_at = models.DateField(auto_now=True)

    def __str__(self):
        return self.name
    
