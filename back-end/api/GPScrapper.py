import requests
import datetime
import time
import re
import json
from unidecode import unidecode

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
            object[responseID]['slug'] = slugger(game['LocalizedProperties'][0]['ProductTitle'])
            object[responseID][key] = True
    
    return object
        




prueba = requestData(GamePassScrapper(URLS))

with open("data.json", "w") as file:
    json.dump(dict(sorted(prueba.items())), file)