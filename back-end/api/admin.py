from django.contrib import admin

# Register your models here.
from api.models.game import Game, CategoryEnum, StatusEnum

admin.site.register(Game)