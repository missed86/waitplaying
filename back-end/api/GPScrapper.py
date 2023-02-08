import requests
import datetime
import time
import re
import json

mainURL = r"https://displaycatalog.mp.microsoft.com/v7.0/products?bigIds={ids}&market=US&languages=en-us&MS-CV=DGU1mcuYo0WMMp"
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


    response = requests.get(URL)
    output = response.json()

    return output

def requestData(ids):
    object = dict()
    for id in ids[1:]:
        id= id['id']
        URL = f'https://displaycatalog.mp.microsoft.com/v7.0/products?bigIds={id}&market=ES&languages=en-us&MS-CV=DGU1mcuYo0WMMp'
        response = requests.get(URL).json()
        responseID = response['Products'][0]['ProductId']
        object[responseID] = {
            'title': response['Products'][0]['LocalizedProperties'][0]['ProductTitle'],
            'short_title': response['Products'][0]['LocalizedProperties'][0]['ShortTitle'],
            'end_date': response['Products'][0]['DisplaySkuAvailabilities'][0]['Availabilities'][0]['Conditions']['EndDate'],
            'start_date': response['Products'][0]['DisplaySkuAvailabilities'][0]['Availabilities'][0]['Conditions']['StartDate'],
            'slug': slugger(response['Products'][0]['LocalizedProperties'][0]['ProductTitle']),
            'console': True
        }
        print(slugger(object[responseID]['title']), object[responseID]['title'])
    
    return object
        




prueba = sorted(requestData(GamePassScrapper(console_URL)).items(), key=lambda x: x[1]['start_date'])

with open("data.json", "w") as file:
    json.dump(prueba, file)