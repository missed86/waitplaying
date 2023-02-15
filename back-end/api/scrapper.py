from .models import Game, Cover, Platform, Screenshot, Scrapping, ReleaseDate
from django.db.models import Max
from django.http import HttpResponse

import requests
import datetime
import time
from . import secret
# from datetime import datetime
# import random
"""
Lanzamiento PS4 : 15 de noviembre de 2013 (1384470000)
Lanzamiento XboxOne: 22 de noviembre de 2013
"""

# DBSTARTDATE = 1640991600
# DBSTARTDATE = 1384470000
DBSTARTDATE = 0

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


def scrape_games():
    print("Scrapping Games...")
    start_time = time.time()
    games_url = "https://api.igdb.com/v4/multiquery"
    offset = 0
    total = 0

    cuttime = 0
    # Get updated time
    try:
        cuttime = Scrapping.objects.get(table_name='Game').updated_at
    except Scrapping.DoesNotExist:
        Scrapping.objects.create(table_name='Game', updated_at=0, last_id=0)

    while True:
        query = requests.post(games_url,
                              headers={
                                  'Client-ID': client_id,
                                  'Authorization': 'Bearer '+access_token
                              },
                              data='query games "Wait" { \
                                    fields *, cover.image_id, \
                                        artworks.image_id, screenshots.image_id; \
                                    where updated_at > '+str(cuttime)+' \
                                        & first_release_date > '+str(DBSTARTDATE)+'; \
                                    offset '+str(offset)+'; \
                                    limit 500; \
                                    sort id asc; \
                                    };')
        if query.status_code == 200:
            try:
            # print(query.json())

                for data in query.json()[0]['result']:
                    id = data['id'] if 'id' in data else None
                    category = data['category'] if 'category' in data else None
                    cover = data['cover']['image_id'] if 'cover' in data else None
                    first_release_date = datetime.datetime.fromtimestamp(data['first_release_date']).strftime(
                        '%Y-%m-%d') if 'first_release_date' in data else None
                    # first_release_date = data['first_release_date'] if 'first_release_date' in data else None
                    name = data['name'] if 'name' in data else None
                    slug = data['slug'] if 'slug' in data else None
                    summary = data['summary'] if 'summary' in data else None
                    storyline = data['storyline'] if 'storyline' in data else None
                    url = data['url'] if 'url' in data else None
                    # genres = ','.join(str(e) for e in data['genres']) if 'genres' in data else None
                    # print(data['id'],data['platforms'])
                    platforms = data['platforms'] if 'platforms' in data else None
                    # platforms = ','.join(e['abbreviation'] for e in data['platforms']
                    #                      if 'abbreviation' in e) if 'platforms' in data else None
                    screenshots = ','.join(
                        e['image_id'] for e in data['screenshots']) if 'screenshots' in data else None
                    artworks = ','.join(
                        e['image_id'] for e in data['artworks']) if 'artworks' in data else None
                    # artworks = ','.join(str(e['image_id']) for e in data['artworks']) if 'artworks' in data else None

                    created_at = data['created_at'] if 'created_at' in data else None
                    updated_at = data['updated_at'] if 'updated_at' in data else None

                    rating_count = data['rating_count'] if 'rating_count' in data else None
                    rating = data['rating'] if 'rating' in data else None
                    total_rating_count = data['total_rating_count'] if 'total_rating_count' in data else None
                    total_rating = data['total_rating'] if 'total_rating' in data else None
                    aggregated_rating_count = data['aggregated_rating_count'] if 'aggregated_rating_count' in data else None
                    aggregated_rating = data['aggregated_rating'] if 'aggregated_rating' in data else None
                    follows = data['follows'] if 'follows' in data else None

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
                                # platforms=platforms,
                                screenshots=screenshots,

                                rating_count=rating_count,
                                rating=rating,
                                total_rating_count=total_rating_count,
                                total_rating=total_rating,
                                aggregated_rating_count=aggregated_rating_count,
                                aggregated_rating=aggregated_rating,
                                follows = follows
                                )
                    game.save()

                    platformsField = Platform.objects.filter(id__in=platforms)
                    game.platforms.set(platformsField)

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

                    # Update the value of updated_at
                    max_id = Game.objects.aggregate(Max('id'))['id__max']
                    max_updated_at = Game.objects.aggregate(
                        Max('updated_at'))['updated_at__max']
                    Scrapping.objects.filter(table_name='Game').update(
                        last_id=max_id, updated_at=max_updated_at)

                    break

                else:
                    offset += 500

            except:
                print("\nFailed {}\n")
        else:
            print("Error: ", response.status_code)
            print(response.json())
            time.sleep(5)


def scrape_platforms():
    print("Scrapping Platforms...")
    start_time = time.time()
    games_url = "https://api.igdb.com/v4/platforms"
    offset = 0
    total = 0
    cuttime = 0
    try:
        cuttime = Scrapping.objects.get(table_name='Platform').updated_at
    except Scrapping.DoesNotExist:
        Scrapping.objects.create(
            table_name='Platform', updated_at=0, last_id=0)

    while True:
        query = requests.post(games_url,
                              headers={
                                  'Client-ID': client_id,
                                  'Authorization': 'Bearer '+access_token
                              },
                              data='fields *; \
                where updated_at > '+str(cuttime)+'; \
                offset '+str(offset)+'; \
                limit 500;')
        if query.status_code == 200:
            # print(query.json())
            for data in query.json():
                try:
                    id = data['id'] if 'id' in data else None
                    abbreviation = data['abbreviation'] if 'abbreviation' in data else None
                    alternative_name = data['alternative_name'] if 'alternative_name' in data else None
                    # platform_logo = data['platform_logo'] if 'platform_logo' in data else None
                    # platform_family = data['platform_family'] if 'platform_family' in data else None
                    category = data['category'] if 'category' in data else None
                    generation = data['generation'] if 'generation' in data else None
                    name = data['name'] if 'name' in data else None
                    slug = data['slug'] if 'slug' in data else None
                    # summary = data['summary'] if 'summary'in data else None

                    created_at = data['created_at'] if 'created_at' in data else None
                    updated_at = data['updated_at'] if 'updated_at' in data else None

                    platform = Platform(id=id,
                                        name=name,
                                        slug=slug,
                                        category=category,
                                        abbreviation=abbreviation,
                                        alternative_name=alternative_name,
                                        generation=generation,
                                        created_at=created_at,
                                        updated_at=updated_at,
                                        # summary=summary,
                                        # url=url,
                                        # platform_logo = platform_logo,
                                        # platform_family = platform_family,
                                        )
                    platform.save()

                    print(end='\x1b[2K')
                    print("Scrapping Platforms: ", id, name,
                          'Successfully added', end="\r")
                    total += 1
                except:
                    print("\nFailed to insert into MySQL table {}\n")

            if len(query.json()) < 500:

                end_time = time.time()
                elapsed_time = end_time - start_time

                print(end='\x1b[2K')
                print("Terminado Platforms: Se han guardado " + str(total) + " elementos en",
                      time.strftime("%M minutos, %S segundos", time.gmtime(elapsed_time)))

                # Update the value of updated_at
                max_id = Platform.objects.aggregate(Max('id'))['id__max']
                max_updated_at = Platform.objects.aggregate(Max('updated_at'))[
                    'updated_at__max']
                Scrapping.objects.filter(table_name='Platform').update(
                    last_id=max_id, updated_at=max_updated_at)

                break

            else:
                offset += 500

        else:
            print("Error: ", response.status_code)
            print(response.json())
            time.sleep(5)


def scrape_release_dates():
    print("Scrapping Release Dates...")
    start_time = time.time()
    games_url = "https://api.igdb.com/v4/release_dates"
    offset = 0
    total = 0

    # Get updated time
    cuttime = 0
    try:
        cuttime = Scrapping.objects.get(table_name='ReleaseDate').updated_at
    except Scrapping.DoesNotExist:
        Scrapping.objects.create(
            table_name='ReleaseDate', updated_at=0, last_id=0)

    while True:
        query = requests.post(games_url,
                              headers={
                                  'Client-ID': client_id,
                                  'Authorization': 'Bearer '+access_token
                              },
                              data='fields *; \
                where updated_at > '+str(cuttime)+' & date > '+str(DBSTARTDATE)+'\
                & date > '+str(DBSTARTDATE)+'; \
                offset '+str(offset)+'; \
                limit 500;')
        if query.status_code == 200:
            # print(query.json())
            for data in query.json():
                try:
                    id = data['id'] if 'id' in data else None
                    date = datetime.datetime.fromtimestamp(data['date']).strftime(
                        '%Y-%m-%d') if 'date' in data else None
                    m = data['m'] if 'm' in data else None
                    y = data['y'] if 'y' in data else None
                    game = data['game'] if 'game' in data else None
                    platform = data['platform'] if 'platform' in data else None
                    region = data['region'] if 'region' in data else None

                    created_at = data['created_at'] if 'created_at' in data else None
                    updated_at = data['updated_at'] if 'updated_at' in data else None
                    select = ReleaseDate.objects.filter(game=Game.objects.get(id=game), platform=Platform.objects.get(id=platform))
                    if select.exists():
                        # Realiza la operación de actualización
                        select = select.first() # Obtiene el primer objeto que cumple las condiciones
                        select.date=date
                        select.m=m
                        select.y=y
                        select.region=region
                        select.created_at=created_at
                        select.updated_at=updated_at
                        select.save()
                    else:
                        # Realiza la operación de inserción
                        objeto = ReleaseDate(id=id,
                                                date=date,
                                                m=m,
                                                y=y,
                                                game=Game.objects.get(id=game),
                                                platform=Platform.objects.get(
                                                    id=platform),
                                                region=region,
                                                created_at=created_at,
                                                updated_at=updated_at,
                                                )
                        objeto.save()

                    print(end='\x1b[2K')
                    print("Scrapping Release Dates: ", id, date,
                          'Successfully added', end="\r")
                    total += 1
                except Game.DoesNotExist:
                    pass
                except Platform.DoesNotExist:
                    pass
            if len(query.json()) < 500:

                end_time = time.time()
                elapsed_time = end_time - start_time

                print(end='\x1b[2K')
                print("Terminado Release Dates: Se han guardado " + str(total) + " elementos en",
                      time.strftime("%M minutos, %S segundos", time.gmtime(elapsed_time)))

                # Update the value of updated_at
                max_id = ReleaseDate.objects.aggregate(Max('id'))['id__max']
                max_updated_at = ReleaseDate.objects.aggregate(Max('updated_at'))[
                    'updated_at__max']
                Scrapping.objects.filter(table_name='ReleaseDate').update(
                    last_id=max_id, updated_at=max_updated_at)

                break

            else:
                offset += 500

        else:
            print("Error: ", response.status_code)
            print(response.json())
            time.sleep(5)


# scrape_games()
