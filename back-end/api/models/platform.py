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
    category = models.IntegerField(choices=[(tag.name, tag.value) for tag in CategoryEnum])
    abbreviation = models.CharField(max_length=255)
    alternative_name = models.CharField(max_length=255)
    created_at = models.IntegerField()
    updated_at = models.IntegerField()
    generation = models.IntegerField()
    name = models.CharField(max_length=255)
    slug = models.CharField(max_length=255)