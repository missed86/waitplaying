from .models import Log, Type

def logger(type, source, message):
    log = Log(message=message, type=type.value, source=source)
    log.save()