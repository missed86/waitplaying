import re
from unidecode import unidecode

def slugger(string):
    string = re.sub(r'\(.*?\)', '', string)
    string = re.sub(r'[^-\w\s]', '', string).strip().lower()
    string = re.sub(r'\s+', '-', string)
    return unidecode(string)