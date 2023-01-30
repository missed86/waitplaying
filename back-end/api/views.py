# from django.shortcuts import render
from django.http import HttpResponse
from .scrapper import scrape_games

def home_page_view(request):
    scrape_games()
    return HttpResponse("Algo hace")


# Create your views here.
