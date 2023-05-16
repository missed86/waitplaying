from django.db import models
from enum import Enum
import datetime

class GamepassPCCatalog(models.Model):
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

    class Meta:
        """Meta definition for GamepassPCCatalog."""
        
        verbose_name = 'Gamepass PC Catalog'
        verbose_name_plural = 'Gamepass PC Catalogs'

    def __str__(self):
        return self.name
