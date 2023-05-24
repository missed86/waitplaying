from django.core.management.base import BaseCommand
from api.global_functions import logger, Type

from api.main_scrapper import main_scrapper

class Command(BaseCommand):
    help = 'Ejecutar scraping_schedule'
    name = 'scrapper'

    def handle(self, *args, **options):
        # Llama a tu función scrapping_schedule() aquí
        logger(Type.info, "Scrapper command", "Command scrapping started")

        scrapped_dict = main_scrapper()

        logger(Type.info, "Scrapper command", "Command scrapping finished: " + str(scrapped_dict))