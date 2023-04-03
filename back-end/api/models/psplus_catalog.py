from django.db import models
from enum import Enum
import datetime

class PsPlusCatalog(models.Model):
    name = models.TextField(null=False, unique=True)
    slug_catalog = models.TextField(null=False)
    game = models.ForeignKey('Game', on_delete=models.SET_NULL, null=True, blank=True)
    start_date = models.DateField(null=False, blank=True, default=datetime.date.today)
    end_date = models.DateField(null=False, blank=True)
    active = models.BooleanField(default=True)
