from django.shortcuts import render
# from django.http import HttpResponse
from rest_framework import generics, status
from .serializers import RoomSerializer, CreateRoomSerializer
from .models import Room
from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.

# def main(request):
#     return HttpResponse("hi")

class RoomView(generics.CreateAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

class CreateRoomView(generics.CreateAPIView):
    serializer_class = CreateRoomSerializer

    def post (self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            can_guests_pause = serializer.data.get('can_guests_pause')
            votes_for_skip = serializer.data.get('votes_for_skip')
            email = serializer.data.get('email')
            self.request.session.save()
            host = self.request.session.session_key
            print(self.request.session.session_key, "host")
            queryset = Room.objects.filer(host=host)
            if queryset.exists():
                room = queryset[0]
                room.can_guets_pause = can_guests_pause
                room.votes_for_skip = votes_for_skip
                room.email = email
                room.save(update_fields=['email', 'can_guests_pause', 'votes_for_skip'])
            else:
                room = Room(host=host, email=email, can_guests_pause=can_guests_pause, votes_for_skip=votes_for_skip)
                room.save()
            
            return Response(RoomSerializer(room).data, status=status.HTTP_204)

