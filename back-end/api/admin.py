from django.contrib import admin
from api.models import Game, Company, Platform, ReleaseDate, Cover, Screenshot, Scrapping, UserGameSet, GamepassPCCatalog, GamepassConsoleCatalog, PsPlusCatalog


class GameAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'category',
                    'first_release_date', 'slug', 'cover', 'created_at', 'updated_at']


class PlatformAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'category', 'abbreviation', 'name',
                    'alternative_name', 'slug', 'generation', 'created_at', 'updated_at']


class ScrappingAdmin(admin.ModelAdmin):
    list_display = ['table_name', 'updated_at', 'last_id']
    


class ReleaseDateAdmin(admin.ModelAdmin):
    list_display = ['id', 'platform', 'date', 'updated_at']



blacklist = (
' (PC)',
' (Win)',
' (Windows 10)',
' Xbox One',
' Xbox Series X|S',
' (Game Preview)',
' EA Play Edition',
' for Windows 10',
' - Windows Edition'
' - Windows 10 Edition'
' - Windows',
' - Microsoft Store Edition',
' - PC',
'®',
'™',
'!',
'?',
'.',
':',
"Assassin’s",
"’s",
"Û",
' PS4 & PS5',
' - PlayStation4 Edition',
' (PlayStation Plus)',
' PlayStation5 Version',
' (PS1/PS4)',
)

def cleaner(string):
    for word in blacklist:
        string = string.replace(word, '')
    return string


class GamepassConsoleCatalogAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'game', 'short_name', 'slug_catalog',
                    'start_date','end_date', 'updated_at', 'active']
    ordering = ['game','id']
    

    def search_game(self, term):
        words = cleaner(term).strip().split()
        matching_games = []
        while words:
            search_term = " ".join(words)
            matching_games = Game.objects.filter(name__icontains=search_term)
            if matching_games:
                break
            words.pop()
        return [game.id for game in matching_games]

    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if db_field.name == "game":
            obj_id = request.resolver_match.kwargs.get('object_id')
            if obj_id:
                obj = GamepassConsoleCatalog.objects.get(id=obj_id)
                term = obj.name
                game_ids = self.search_game(term)
                if game_ids:
                    kwargs["queryset"] = Game.objects.filter(id__in=game_ids)
                else:
                    kwargs["queryset"] = Game.objects.none()
        return super().formfield_for_foreignkey(db_field, request, **kwargs)
    
class GamepassPCCatalogAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'game', 'short_name', 'slug_catalog',
                    'start_date','end_date', 'updated_at', 'active']
    ordering = ['game','id']
    

    def search_game(self, term):
        words = cleaner(term).strip().split()
        matching_games = []
        while words:
            search_term = " ".join(words)
            matching_games = Game.objects.filter(name__icontains=search_term)
            if matching_games:
                break
            words.pop()
        return [game.id for game in matching_games]

    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if db_field.name == "game":
            obj_id = request.resolver_match.kwargs.get('object_id')
            if obj_id:
                obj = GamepassPCCatalog.objects.get(id=obj_id)
                term = obj.name
                game_ids = self.search_game(term)
                if game_ids:
                    kwargs["queryset"] = Game.objects.filter(id__in=game_ids)
                else:
                    kwargs["queryset"] = Game.objects.none()
        return super().formfield_for_foreignkey(db_field, request, **kwargs)
    

class PsPlusCatalogAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'game', 'slug_catalog',
                    'start_date', 'end_date', 'updated_at', 'active']
    ordering = ['game','id']
    

    def search_game(self, term):
        words = cleaner(term).strip().split()
        matching_games = []
        while words:
            search_term = " ".join(words)
            matching_games = Game.objects.filter(name__icontains=search_term)
            if matching_games:
                break
            words.pop()
        return [game.id for game in matching_games]

    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if db_field.name == "game":
            obj_id = request.resolver_match.kwargs.get('object_id')
            if obj_id:
                obj = PsPlusCatalog.objects.get(id=obj_id)
                term = obj.name
                game_ids = self.search_game(term)
                if game_ids:
                    kwargs["queryset"] = Game.objects.filter(id__in=game_ids)
                else:
                    kwargs["queryset"] = Game.objects.none()
        return super().formfield_for_foreignkey(db_field, request, **kwargs)


admin.site.register(Game, GameAdmin)

admin.site.register(Platform, PlatformAdmin)
admin.site.register(ReleaseDate, ReleaseDateAdmin)
admin.site.register(Cover)
admin.site.register(Screenshot)
admin.site.register(Scrapping, ScrappingAdmin)
admin.site.register(UserGameSet)
admin.site.register(GamepassPCCatalog, GamepassPCCatalogAdmin)
admin.site.register(GamepassConsoleCatalog, GamepassConsoleCatalogAdmin)
admin.site.register(PsPlusCatalog, PsPlusCatalogAdmin)
