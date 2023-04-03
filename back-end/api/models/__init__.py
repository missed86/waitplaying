from .game import Game
from .company import Company
from .platform import Platform
from .release_date import ReleaseDate
from .cover import Cover
from .screenshot import Screenshot
from .scrapping import Scrapping
from .user_game_set import UserGameSet
from .gamepass_catalog import GamepassCatalog
from .psplus_catalog import PsPlusCatalog

from django.db import models
from django.contrib.auth.models import User

class Note(models.Model):
    user = models.ForeignKey(User, on_delete= models.CASCADE, null=True)
    body = models.TextField()