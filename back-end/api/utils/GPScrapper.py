import requests
import datetime
# import time
import re
import json
from unidecode import unidecode

from api.models import GamepassCatalog, Game
from django.db.models import Max
from django.http import HttpResponse


console_URL = 'https://catalog.gamepass.com/sigls/v2?id=f6f1f99f-9b49-4ccd-b3bf-4d9767a77f5e&language=en-us&market=US'
PC_URL = 'https://catalog.gamepass.com/sigls/v2?id=fdd9e2a7-0fee-49f6-ad69-4354098401ff&language=en-us&market=US'

URLS = {
    'console': 'https://catalog.gamepass.com/sigls/v2?id=f6f1f99f-9b49-4ccd-b3bf-4d9767a77f5e&language=en-us&market=US',
    'pc': 'https://catalog.gamepass.com/sigls/v2?id=fdd9e2a7-0fee-49f6-ad69-4354098401ff&language=en-us&market=US'
}


def slugger(string):
    string = re.sub(r'\(.*?\)', '', string)
    string = re.sub(r'[^-\w\s]', '', string).strip().lower()
    string = re.sub(r'\s+', '-', string)
    return  unidecode(string)

def GamePassScrapper(input):
    """
    GamePass Console Games
    https://catalog.gamepass.com/sigls/v2?id=f6f1f99f-9b49-4ccd-b3bf-4d9767a77f5e&language=en-us&market=US
    GamePass PC Games
    https://catalog.gamepass.com/sigls/v2?id=fdd9e2a7-0fee-49f6-ad69-4354098401ff&language=en-us&market=US
    """
    result = dict()
    for key, value in input.items():
        GamepassAllGamesJSON = requests.get(value)
        # output = GamepassAllGamesJSON.json()

        GamepassAllGamesList = []
        for game in GamepassAllGamesJSON.json():
            # GamepassAllGamesList.append(game['id'])
            if 'id' in game:
                GamepassAllGamesList.append(game['id'])
        result[key] = ",".join(GamepassAllGamesList)
        

    return result

def requestData(input):
    object = dict()
    for key, value in input.items():
        URL = f'https://displaycatalog.mp.microsoft.com/v7.0/products?bigIds={value}&market=ES&languages=en-us&MS-CV=DGU1mcuYo0WMMp'
        response = requests.get(URL).json()
        for game in response['Products']:
            responseID = game['ProductId']
            responseID = slugger(game['LocalizedProperties'][0]['ProductTitle'])
            # object[responseID] = {
            #     'title': game['LocalizedProperties'][0]['ProductTitle'],
            #     'short_title': game['LocalizedProperties'][0]['ShortTitle'],
            #     'end_date': game['DisplaySkuAvailabilities'][0]['Availabilities'][0]['Conditions']['EndDate'],
            #     'start_date': game['DisplaySkuAvailabilities'][0]['Availabilities'][0]['Conditions']['StartDate'],
            #     'slug': slugger(game['LocalizedProperties'][0]['ProductTitle']),
            #     key: True
            # }
            object[responseID] = object[responseID] if responseID in object else {}
            object[responseID]['title'] = game['LocalizedProperties'][0]['ProductTitle']
            object[responseID]['short_title'] = game['LocalizedProperties'][0]['ShortTitle']
            object[responseID]['end_date'] = game['DisplaySkuAvailabilities'][0]['Availabilities'][0]['Conditions']['EndDate']
            object[responseID]['start_date'] = game['DisplaySkuAvailabilities'][0]['Availabilities'][0]['Conditions']['StartDate']
            object[responseID]['slug_catalog'] = slugger(game['LocalizedProperties'][0]['ProductTitle'])
            object[responseID]['console'] = False if 'console' not in object else object[responseID]['console']
            object[responseID]['pc'] = False if 'console' not in object else object[responseID]['pc']
            object[responseID][key] = True
    
    return object
        
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
    )

def cleaner(string):
    for word in blacklist:
        string = string.replace(word, '')
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

def GamepassScrape():
    games = requestData(GamePassScrapper(URLS))
    counter = 0
    total = len(games)
    for key in games.keys():
        game = games[key]
        element = GamepassCatalog(
                    name=game['title'].replace('®','').replace('™',''),
                    short_name=game['short_title'].replace('®','').replace('™',''),
                    slug_catalog=game['slug_catalog'],
                    start_date=game['start_date'],
                    end_date=game['end_date'],
                    pc=game['pc'],
                    console=game['console'],
                    )
        try:
            # Buscar el objeto por el campo name
            existing_game = GamepassCatalog.objects.filter(name=element.name).first()
            
            if existing_game:
                gamesearch = search_game(game['title'].replace('®','').replace('™',''))
                if existing_game.game is None and len(gamesearch) == 1:
                    element.game = Game.objects.get(id=gamesearch[0])
                else:
                    element.game = None
                # Actualizar el objeto existente con los nuevos datos
                existing_game.short_name = element.short_name
                existing_game.slug_catalog = element.slug_catalog
                existing_game.start_date = element.start_date
                existing_game.end_date = element.end_date
                existing_game.pc = element.pc
                existing_game.console = element.console
                existing_game.game = element.game if existing_game.game is None else existing_game.game
                
                existing_game.save()
            else:
                # Crear un nuevo objeto si no existe uno con el mismo nombre
                if len(gamesearch) == 1:
                    element.game = Game.objects.get(id=gamesearch[0])
                else:
                    element.game = None
                element.save()
            counter += 1
            print("\r{}/{} - {} - {}".format(counter, total, element.name, element.game), end="                           ")
        except Exception:
            print("\nFailed {}\n")