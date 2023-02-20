from django.db import models
from django.contrib.auth.models import User

class UserGameSet(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE)
    game = models.ForeignKey(
        'Game', on_delete=models.CASCADE)
    mark = models.BooleanField(default=False)
    like = models.BooleanField(null=True)