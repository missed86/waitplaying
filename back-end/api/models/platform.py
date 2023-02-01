from django.db import models
from enum import Enum


class CategoryEnum(Enum):
    console = 1
    arcade = 2
    platform = 3
    operating_system = 4
    portable_console = 5
    computer = 6

class Platform(models.Model):
    id = models.IntegerField(primary_key=True)
    category = models.IntegerField(choices=[(tag.name, tag.value) for tag in CategoryEnum], null=True)
    abbreviation = models.CharField(max_length=255, null=True)
    alternative_name = models.CharField(max_length=255, null=True)
    created_at = models.IntegerField()
    updated_at = models.IntegerField()
    generation = models.IntegerField(null=True)
    name = models.CharField(max_length=255, null=True)
    slug = models.CharField(max_length=255, null=True)