import api.scrapper as igdb_scrapper
from api.utils.GPScrapper_forConsole import GamepassScrappeConsole
from api.utils.GPScrapper_forPC import GamepassScrappePC
from api.utils.PSPlusScrapper import PsPlusScrappe


def main_scrapper():

    games = igdb_scrapper.scrape_games()
    platforms = igdb_scrapper.scrape_platforms()
    release_dates = igdb_scrapper.scrape_release_dates()
    gamepassConsole = GamepassScrappeConsole()
    gamepassPC = GamepassScrappePC()
    psplus = PsPlusScrappe()

    return {
        "IGDB-Games": games,
        "IGDB-Platforms": platforms,
        "IGDB-ReleaseDates": release_dates,
        "GamepassConsole": gamepassConsole,
        "GamepassPC": gamepassPC,
        "PSPlus": psplus
        }