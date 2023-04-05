import requests
import datetime
# import time
import re
import json
from unidecode import unidecode
from bs4 import BeautifulSoup

from api.models import PsPlusCatalog, Game
from django.db.models import Max
from django.http import HttpResponse


URLPlaystation = "https://www.playstation.com/es-es/ps-plus/games"


def slugger(string):
    string = re.sub(r'\(.*?\)', '', string)
    string = re.sub(r'[^-\w\s]', '', string).strip().lower()
    string = re.sub(r'\s+', '-', string)
    return  unidecode(string)

def PsPlusScrapper():
    page = requests.get(URLPlaystation)
    soup = BeautifulSoup(page.content, "html.parser")

    elements = soup.select(".tabs__content .contentgrid p.txt-style-base")

    result = []

    for e in elements:
        element = {}
        name = e.text.replace('*','').replace('®','').replace('™','')
        element['name'] = name.strip()
        element['slug'] = slugger(e.text)
        result.append(element)
            

    return result
        
blacklist = (
    '®',
    '™',
    '- PS5 & PS4'
    'PS4 & PS5',
    'PS4 &  PS5',
    '- PlayStation4 Edition',
    '– PlayStation4 Edition',
    '(PlayStation Plus)',
    'PlayStation5 Version',
    '(PS1/PS4)',
    '(PS1/PS5)',
    '(PS3)',
    '(PS4)',
    '(PS5)',
    '- Standard Edition',
    '(Standard Version)',
    'Standard Edition',
    '- PS4',
    'for PS4',
    'for PS5',
    'Digital Edition',
    )

def cleaner(string):
    for word in blacklist:
        string = string.strip().replace(word, '').strip()
    return string


# prueba = requestData(GamePassScrapper(URLS))
def search_game(term):
    gameid = Game.objects.filter(name__iexact=cleaner(term))
    if gameid.exists():
        return [gameid.first().id]

    words = cleaner(term).replace('!','').replace('?','').strip().split()
    matching_games = []
    while words:
        search_term = " ".join(words)
        matching_games = Game.objects.filter(name__icontains=search_term)
        if matching_games:
            break
        words.pop()
    return [game.id for game in matching_games]

def PsPlusScrappe():
    games = PsPlusScrapper()
    counter = 0
    total = len(games)
    for game in games:
        element = PsPlusCatalog(
                    name=game['name'].replace('®','').replace('™',''),
                    slug_catalog=game['slug'],
                    # start_date=game['start_date'],
                    # end_date=game['end_date'],
                    # pc=game['pc'],
                    # console=game['console'],
                    )
        try:
            # Buscar el objeto por el campo name
            existing_game = PsPlusCatalog.objects.filter(name=element.name).first()
            
            if existing_game:
                if existing_game.game is None:
                    gamesearch = search_game(game['name'].replace('®','').replace('™',''))
                    if len(gamesearch) == 1:
                        element.game = Game.objects.get(id=gamesearch[0])
                # else:
                #     element.game = None
                # Actualizar el objeto existente con los nuevos datos
                # existing_game.short_name = element.short_name
                existing_game.slug_catalog = element.slug_catalog
                # existing_game.start_date = element.start_date
                # existing_game.end_date = element.end_date
                # existing_game.pc = element.pc
                # existing_game.console = element.console
                existing_game.game = element.game if existing_game.game is None else existing_game.game
                
                existing_game.save()
            else:
                # Crear un nuevo objeto si no existe uno con el mismo nombre
                gamesearch = search_game(game['name'].replace('®','').replace('™',''))
                if len(gamesearch) == 1:
                    element.game = Game.objects.get(id=gamesearch[0])
                else:
                    element.game = None
                element.save()
            counter += 1
            print("\r{}/{} - {}".format(counter, total, element.name), end="                           ")
        except Exception:
            print("\nFailed {}\n")

    PsPlusCatalog.objects.filter(updated_at__lt=datetime.date.today()).update(active=False, end_date=datetime.date.today())
    PsPlusCatalog.objects.filter(
        updated_at__gte=datetime.date.today(), active=False
        ).update(active=True, start_date=datetime.date.today())
