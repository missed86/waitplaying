from django.db import models
from enum import Enum


class ChangeDateCategory(Enum):
    YYYYMMMMDD = 0
    YYYYMMMM = 1
    YYYY = 2
    YYYYQ1 = 3
    YYYYQ2 = 4
    YYYYQ3 = 5
    YYYYQ4 = 6
    TBD = 7


class StartDateCategory(Enum):
    YYYYMMMMDD = 0
    YYYYMMMM = 1
    YYYY = 2
    YYYYQ1 = 3
    YYYYQ2 = 4
    YYYYQ3 = 5
    YYYYQ4 = 6
    TBD = 7


class Company(models.Model):
    change_date = models.IntegerField()
    change_date_category = models.CharField(max_length=20, choices=[(tag.name, tag.value) for tag in ChangeDateCategory])
    # changed_company = models.ForeignKey(
    #     'self', on_delete=models.SET_NULL, null=True, blank=True)
    checksum = models.UUIDField()
    country = models.IntegerField()
    created_at = models.IntegerField()
    description = models.TextField()
    developed = models.ManyToManyField('Game', related_name='developed')
    # logo = models.ForeignKey(
    #     'CompanyLogo', on_delete=models.SET_NULL, null=True, blank=True)
    name = models.CharField(max_length=255)
    parent = models.ForeignKey(
        'self', on_delete=models.SET_NULL, null=True, blank=True)
    published = models.ManyToManyField('Game', related_name='published')
    slug = models.CharField(max_length=255)
    start_date = models.IntegerField()
    start_date_category = models.CharField(max_length=20, choices=[(tag.name, tag.value) for tag in StartDateCategory])
    updated_at = models.IntegerField()
    url = models.CharField(max_length=255)
    # websites = models.ManyToManyField('CompanyWebsite')
