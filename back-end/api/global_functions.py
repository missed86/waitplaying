from .models import Log, Type
from enum import Enum

class Type(Enum):
    info = 1
    warning = 2
    error = 3

def logger(type, source, message):
    log = Log(message=message, type=type.value, source=source)
    log.save()