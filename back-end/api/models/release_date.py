from django.db import models
from enum import Enum


class CategoryEnum(Enum):
    YYYYMMMMDD = 0
    YYYYMMMM = 1
    YYYY = 2
    YYYYQ1 = 3
    YYYYQ2 = 4
    YYYYQ3 = 5
    YYYYQ4 = 6
    TBD = 7


class RegionEnum(Enum):
    europe = 1
    north_america = 2
    australia = 3
    new_zealand = 4
    japan = 5
    china = 6
    asia = 7
    worldwide = 8
    korea = 9
    brazil = 10


class ReleaseDate(models.Model):
    id = models.IntegerField(primary_key=True)
    date = models.IntegerField()
    game = models.ForeignKey(
        'Game', on_delete=models.SET_NULL, null=True, blank=True)
    m = models.IntegerField()
    y = models.IntegerField()
    platform = models.ForeignKey(
        'Platform', on_delete=models.SET_NULL, null=True, blank=True)
    created_at = models.IntegerField()
    updated_at = models.IntegerField()
    region = models.IntegerField(
        choices=[(tag.name, tag.value) for tag in RegionEnum])
