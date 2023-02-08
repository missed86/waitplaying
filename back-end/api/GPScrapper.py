import requests
import datetime
import time
import re
import json

console_URL = 'https://catalog.gamepass.com/sigls/v2?id=f6f1f99f-9b49-4ccd-b3bf-4d9767a77f5e&language=en-us&market=US'

def slugger(string):
    string = re.sub(r'\(.*?\)', '', string)
    string = re.sub(r'[^-\w\s]', '', string).strip().lower()
    string = re.sub(r'\s+', '-', string)
    return string

def GamePassScrapper(URL):
    """
    GamePass Console Games
    https://catalog.gamepass.com/sigls/v2?id=f6f1f99f-9b49-4ccd-b3bf-4d9767a77f5e&language=en-us&market=US

    """
    GamepassAllGamesJSON = requests.get(URL)
    output = response.json()

    GamepassAllGamesList = []
    for game in GamepassAllGamesJSON.json():
        # GamepassAllGamesList.append(game['id'])
        if 'id' in game:
            GamepassAllGamesList.append(game['id'])
    idsString = ",".join(GamepassAllGamesList)

    return idString

def requestData(ids):
    object = dict()
    URL = f'https://displaycatalog.mp.microsoft.com/v7.0/products?bigIds={ids}&market=ES&languages=en-us&MS-CV=DGU1mcuYo0WMMp'
    response = requests.get(URL).json()
    for game in response['Products']:
        responseID = game[0]['ProductId']
        object[responseID] = {
            'title': game[0]['LocalizedProperties'][0]['ProductTitle'],
            'short_title': game[0]['LocalizedProperties'][0]['ShortTitle'],
            'end_date': game[0]['DisplaySkuAvailabilities'][0]['Availabilities'][0]['Conditions']['EndDate'],
            'start_date': game[0]['DisplaySkuAvailabilities'][0]['Availabilities'][0]['Conditions']['StartDate'],
            'slug': slugger(game[0]['LocalizedProperties'][0]['ProductTitle']),
            'console': True
        }
    print(slugger(object[responseID]['title']), object[responseID]['title'])
    
    return object
        




prueba = sorted(requestData(GamePassScrapper(console_URL)).items(), key=lambda x: x[1]['start_date'])

with open("data.json", "w") as file:
    json.dump(prueba, file)