from .models import Game, Cover, Platform, Screenshot

import requests
import time
from . import secret
# from datetime import datetime
# import random


url = "https://id.twitch.tv/oauth2/token"

client_id = secret.client_id
client_secret = secret.client_secret

response = requests.post(
    url, {'client_id': client_id, 'client_secret': client_secret, 'grant_type': 'client_credentials'})
output = response.json()

# print(output)

access_token = output['access_token']
expires_in = output['expires_in']
token_type = output['token_type']

# https://id.twitch.tv/oauth2/token?client_id=2fqc5bze9g05w7bt502p1d60zntyuw&client_secret=8xljg3o41te6ggkb0vwkehl1akkay2&grant_type=client_credentials


def scrape_games():
    start_time = time.time()
    games_url = "https://api.igdb.com/v4/multiquery"
    offset = 0
    total = 0

    while True:
        query = requests.post(games_url,
                              headers={'Client-ID': client_id,
                                       'Authorization': 'Bearer '+access_token},
                              data='query games "Wait" { \
                                    fields *, platforms.abbreviation, cover.image_id, artworks.image_id, screenshots.image_id; \
                                    offset '+str(offset)+'; \
                                    limit 500; \
                                    sort id asc; \
                                    };')
        if query.status_code == 200:
            # try:
            # print(query.json())
            for data in query.json()[0]['result']:
                id = data['id'] if 'id' in data else None
                category = data['category'] if 'category' in data else None
                cover = data['cover']['image_id'] if 'cover' in data else None
                created_at = data['created_at'] if 'created_at' in data else None
                first_release_date = data['first_release_date'] if 'first_release_date' in data else None
                name = data['name'] if 'name' in data else None
                slug = data['slug'] if 'slug' in data else None
                summary = data['summary'] if 'summary' in data else None
                storyline = data['storyline'] if 'storyline' in data else None
                updated_at = data['updated_at'] if 'updated_at' in data else None
                url = data['url'] if 'url' in data else None
                # genres = ','.join(str(e) for e in data['genres']) if 'genres' in data else None
                # print(data['id'],data['platforms'])
                platforms = ','.join(e['abbreviation'] for e in data['platforms']
                                     if 'abbreviation' in e) if 'platforms' in data else None
                screenshots = ','.join(
                    e['image_id'] for e in data['screenshots']) if 'screenshots' in data else None
                # artworks = ','.join(str(e['image_id']) for e in data['artworks']) if 'artworks' in data else None

                game = Game(id=id,
                            name=name,
                            slug=slug,
                            category=category,
                            cover=cover,
                            created_at=created_at,
                            updated_at=updated_at,
                            first_release_date=first_release_date,
                            summary=summary,
                            storyline=storyline,
                            url=url,

                            platforms=platforms,
                            screenshots=screenshots,
                            )
                game.save()

                print(end='\x1b[2K')
                print("Scrapping Games: ", id, name,
                      'Successfully added', end="\r")
                total += 1
            if len(query.json()[0]['result']) < 500:

                end_time = time.time()
                elapsed_time = end_time - start_time

                print(end='\x1b[2K')
                print("Terminado Games: Se han guardado " + str(total) + " elementos en",
                      time.strftime("%M minutos, %S segundos", time.gmtime(elapsed_time)))

                break

            else:
                offset += 500

            # except:
            #     print("\nFailed to insert into MySQL table {}\n")
        else:
            print("Error: ", response.status_code)
            print(response.json())
            time.sleep(5)


# scrape_games()
