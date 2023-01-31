from django.db import models


class Scrapping(models.Model):
    table_name = models.CharField(max_length=20, primary_key=True)
    updated_at = models.IntegerField(default=0)
    last_id = models.IntegerField(default=0)