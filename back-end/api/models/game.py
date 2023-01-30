from django.db import models
from enum import Enum

class CategoryEnum(Enum):
    main_game = 0
    dlc_addon = 1
    expansion = 2
    bundle = 3
    standalone_expansion = 4
    mod = 5
    episode = 6
    season = 7
    remake = 8
    remaster = 9
    expanded_game = 10
    port = 11
    fork = 12
    pack = 13
    update = 14

class StatusEnum(Enum):
    released = 0
    alpha = 2
    beta = 3
    early_access = 4
    offline = 5
    canceled = 6
    rumored = 7
    delisted = 8

class Game(models.Model):
    id = models.IntegerField(primary_key=True)
    # age_ratings = models.ManyToManyField('AgeRating', related_name='games')
    aggregated_rating = models.FloatField()
    aggregated_rating_count = models.IntegerField()
    # alternative_names = models.ManyToManyField('AlternativeName', related_name='games')
    # artworks = models.ManyToManyField('Artwork', related_name='games')
    # bundles = models.ManyToManyField('self', related_name='bundles', symmetrical=False)
    category = models.IntegerField(choices=[(tag.name, tag.value) for tag in CategoryEnum])
    checksum = models.UUIDField()
    # collection = models.ForeignKey('Collection', on_delete=models.SET_NULL, null=True, blank=True)
    # cover = models.ForeignKey('Cover', on_delete=models.SET_NULL, null=True, blank=True)
    created_at = models.FloatField()
    # dlcs = models.ManyToManyField('self', related_name='dlcs', symmetrical=False)
    # expanded_games = models.ManyToManyField('self', related_name='expanded_games', symmetrical=False)
    # expansions = models.ManyToManyField('self', related_name='expansions', symmetrical=False)
    # external_games = models.ManyToManyField('self', related_name='external_games', symmetrical=False)
    first_release_date = models.FloatField()
    follows = models.IntegerField()
    # forks = models.ManyToManyField('self', related_name='forks', symmetrical=False)
    # franchises = models.ManyToManyField('Franchise', related_name='games')
    # game_engines = models.ManyToManyField('GameEngine', related_name='games')
    # game_localizations = models.ManyToManyField('GameLocalization', related_name='games')
    # game_modes = models.ManyToManyField('GameMode', related_name='games')
    # genres = models.ManyToManyField('Genre', related_name='games')
    hypes = models.IntegerField()
    # involved_companies = models.ManyToManyField('InvolvedCompany', related_name='games')
    # keywords = models.ManyToManyField('Keyword', related_name='games')
    # language_supports = models.ManyToManyField('LanguageSupport', related_name='games')
    # multiplayer_modes = models.ManyToManyField('MultiplayerMode', related_name='games')
    name = models.CharField(max_length=255)
    # parent_name = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, blank=True, related_name='versions')
    # platforms = models.ManyToManyField('Platform', related_name='games')
    # player_perspectives = models.ManyToManyField('PlayerPerspective', related_name='games')
    # ports = models.ManyToManyField('self', related_name='ports', symmetrical=False)
    rating = models.FloatField()
    rating_count = models.IntegerField()
    # release_dates = models.ManyToManyField('ReleaseDate', related_name='games')
    # remakes = models.ManyToManyField('self', related_name='remakes', symmetrical=False)
    # screenshots = models.ManyToManyField('Screenshot', related_name='games')
    # similar_games = models.ManyToManyField('self', related_name='similar_games', symmetrical=False)
    slug = models.CharField(max_length=255)
    # standalone_expansions = models.ManyToManyField('self', related_name='standalone_expansions', symmetrical=False)
    status = models.IntegerField(choices=[(tag.name, tag.value) for tag in StatusEnum])
    storyline = models.TextField()
    summary = models.TextField()
    # tags = models.ManyToManyField('Tag', related_name='games')
    # themes = models.ManyToManyField('Theme', related_name='games')
    total_rating = models.FloatField()
    total_rating_count = models.IntegerField()
    updated_at = models.FloatField()
    url = models.CharField(max_length=255)
    # version_parent = models.ForeignKey('self', on_delete=models.SET_NULL, null=True, blank=True, related_name='versions')
    version_title = models.CharField(max_length=255)
    # videos = models.ManyToManyField('GameVideo', related_name='games')
    # websites = models.ManyToManyField('Website', related_name='games')

