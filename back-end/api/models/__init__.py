from .game import Game
from .company import Company
from .platform import Platform
from .release_date import ReleaseDate
from .cover import Cover
from .screenshot import Screenshot
from .scrapping import Scrapping
from .user_game_set import UserGameSet
from .psplus_catalog import PsPlusCatalog
from .gamepass_console_catalog import GamepassConsoleCatalog
from .gamepass_pc_catalog import GamepassPCCatalog

from django.db import models
from django.contrib.auth.models import User

class Note(models.Model):
    user = models.ForeignKey(User, on_delete= models.CASCADE, null=True)
    body = models.TextField()