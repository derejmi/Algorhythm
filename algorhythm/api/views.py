from django.shortcuts import render
# from django.http import HttpResponse
from rest_framework import generics
from .serializers import RoomSerializer
from .models import Room

# Create your views here.


# def main(request):
#     return HttpResponse("hi")


class RoomView(generics.CreateAPIView):
    # allows us to view all the different rooms and also create a room
    queryset = Room.objects.all()
    serializer_class = RoomSerializer