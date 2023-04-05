from django.db import models
from enum import Enum
import datetime

class PsPlusCatalog(models.Model):
    name = models.CharField(null=False, unique=True, max_length=255)
    slug_catalog = models.CharField(null=False, max_length=255)
    start_date = models.DateField(null=False, blank=True, auto_now_add=True)
    end_date = models.DateField(null=True, blank=True)
    updated_at = models.DateField(auto_now=True)
    active = models.BooleanField(default=True)
    game = models.ForeignKey('Game', on_delete=models.SET_NULL, null=True, blank=True)
