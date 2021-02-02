from django.db import models
import string
import random

def code_creator():
    length = 5
    while True:
        code = ''.join(random.choices(string.ascii_uppercase + string.ascii_lowercase, k=length))
        if Room.objects.filter(code=code).count() == 0:
            break
    
    return code

# Create your models here.
class Room(models.Model):
    code = models.CharField(max_length=9, default=code_creator, unique=True)
    host = models.CharField(max_length=30, unique=True)
    email = models.EmailField(max_length = 254) 
    can_guests_pause = models.BooleanField(null=False, default=False)
    votes_for_skip = models.IntegerField(null=False, default=2)
    created_date = models.DateTimeField(auto_now_add=True)

