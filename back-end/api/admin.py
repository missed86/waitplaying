from django.contrib import admin
from api.models import Game, Company, Platform, ReleaseDate, Cover, Screenshot


class GameAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'category', 'first_release_date', 'slug', 'created_at', 'updated_at']

admin.site.register(Game, GameAdmin)

admin.site.register(Platform)
admin.site.register(ReleaseDate)
admin.site.register(Cover)
admin.site.register(Screenshot)
# admin.site.register(YourModelAdmin)
