from django.db import models
from enum import Enum

class Type(Enum):
    info = 1
    warning = 2
    error = 3

class Log(models.Model):
    message = models.TextField(max_length=255, blank=True, null=True)
    type = models.CharField(max_length=20, choices=[(t.value, t.name) for t in Type], null=True)
    source = models.CharField(max_length=255, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)

    class Meta:
        verbose_name = 'Log'
        verbose_name_plural = 'Logs'
        ordering = ['-created_at']

    