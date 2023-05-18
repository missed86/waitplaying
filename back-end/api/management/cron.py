

from api.global_functions import logger, Type
from api.main_scrapper import main_scrapper


def scrapping_schedule():
    logger(Type.info, "Scheduler", "Scheduled scrapping started")

    scrapped_dict = main_scrapper()

    logger(Type.info, "Scheduler", "Scheduled scrapping finished: " + str(scrapped_dict))