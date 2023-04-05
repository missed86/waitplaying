from django.db import models
from enum import Enum
import datetime

class GamepassConsoleCatalog(models.Model):
    name = models.CharField(null=False, unique=True, max_length=255)
    short_name = models.CharField(null=False, max_length=255, blank=True)
    slug_catalog = models.CharField(null=False, max_length=255)
    start_date = models.DateField(null=False, blank=True, auto_now_add=True)
    end_date = models.DateField(null=True, blank=True)
    xbox_start_date = models.DateTimeField(null=False, blank=True, auto_now_add=True)
    xbox_end_date = models.DateTimeField(null=False, blank=True)
    updated_at = models.DateField(auto_now=True)
    active = models.BooleanField(default=True)
    game = models.ForeignKey('Game', on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return self.name
