from django.db import models
from enum import Enum

class Type(Enum):
    info = 1
    warning = 2
    error = 3

class Log(models.Model):
    id = models.IntegerField(primary_key=True)
    message = models.TextField(max_length=255, blank=True, null=True)
    type = models.IntegerField(choices=[(tag.name, tag.value) for tag in LogEnum], null=True)
    source = models.CharField(max_length=255, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)

    class Meta:
        """Meta definition for Log."""
        
        managed = False
        db_table = 'log'
        verbose_name = 'Log'
        verbose_name_plural = 'Logs'
        ordering = ['-created_at']

    