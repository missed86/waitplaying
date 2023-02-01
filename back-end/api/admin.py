from django.contrib import admin
from api.models import Game, Company, Platform, ReleaseDate, Cover, Screenshot, Scrapping


class GameAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'category',
                    'first_release_date', 'slug', 'cover' ,'created_at', 'updated_at']


class PlatformAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'category', 'abbreviation', 'name',
                    'alternative_name', 'slug', 'generation', 'created_at', 'updated_at']

class ScrappingAdmin(admin.ModelAdmin):
    list_display = ['table_name', 'updated_at', 'last_id']

class ReleaseDateAdmin(admin.ModelAdmin):
    list_display = ['id', 'platform', 'date', 'updated_at']


admin.site.register(Game, GameAdmin)

admin.site.register(Platform, PlatformAdmin)
admin.site.register(ReleaseDate, ReleaseDateAdmin)
admin.site.register(Cover)
admin.site.register(Screenshot)
admin.site.register(Scrapping, ScrappingAdmin)
# admin.site.register(YourModelAdmin)
