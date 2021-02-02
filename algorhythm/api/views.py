from django.shortcuts import render, redirect
# from django.http import HttpResponse
from rest_framework import generics, status
from .serializers import RoomSerializer, CreateRoomSerializer, UpdateRoomSerializer
from .models import Room
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse

from django.core.mail import send_mail
from django.conf import settings

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
            # self.send_email(email)
            self.request.session.save()
            host = self.request.session.session_key
            print(self.request.session.session_key, "host")
            queryset = Room.objects.filter(host=host)
            if queryset.exists():
                room = queryset[0]
                room.can_guets_pause = can_guests_pause
                room.votes_for_skip = votes_for_skip
                room.email = email
                room.save(update_fields=['email', 'can_guests_pause', 'votes_for_skip'])

                
            else:
                room = Room(host=host, email=email, can_guests_pause=can_guests_pause, votes_for_skip=votes_for_skip)
                room.save()
                self.request.session['room_code'] = room.code
            
            return Response(RoomSerializer(room).data, status=status.HTTP_200_OK)


    def send_email(self,recipient_email):
        subject = 'Hello from Algorhythm!'
        message = 'Hey there!'
        email_from = 'getfutureproof.testing@gmail.com'
        recipient_list = [f'{recipient_email}']

        send_mail( subject, message, email_from, recipient_list, fail_silently=False  )



class RetrieveRoom(APIView):
    serializer = RoomSerializer
    lookup_url_kwarg = 'code'

    def get(self,request, format=None):
        code = request.GET.get(self.lookup_url_kwarg)
        if code:
            room = Room.objects.filter(code=code)
            if len(room) >= 1:
                data = RoomSerializer(room[0]).data
                data['is_host'] = self.request.session.session_key == room[0].host
                return Response(data, status=status.HTTP_200_OK)
            return Response({'err':'Invalid room code, please try again'}, status=status.HTTP_404_NOT_FOUND)
        return Response({'err':'Bad Request'}, status=status.HTTP_400_BAD_REQUEST)

class JoinRoom(APIView): 
    lookup_url_kwarg = 'code'

    def post (self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        code = request.data.get(self.lookup_url_kwarg)
        if code != None:
            room_result = Room.objects.filter(code=code)
            if len(room_result) > 0:
                room = room_result[0]
                self.request.session['room_code'] = code
                return Response({'message':'Room Joined'}, status=status.HTTP_200_OK)
            return Response({'Bad Request':'Invalid Room Code'}, status=status.HTTP_400_BAD_REQUEST)

        return Response({'Bad Request': 'Invalid Post Data, did not find a code key'}, status=status.HTTP_400_BAD_REQUEST)


class LeaveRoom(APIView):
    def post(self, request, format=None):
        if 'room_code' in self.request.session:
            code = self.request.session['room_code']
            host = self.request.session.session_key
            host_rooms = Room.objects.filter(host=host)
            if len(host_rooms) >= 1:
                room_to_delete = host_rooms[0]
                room_to_delete.delete()       
                
        return Response({'msg': 'Room left successfully'}, status=status.HTTP_200_OK)







class IsUserInRoom(APIView):
    def get(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        data = {
            'code': self.request.session.get('room_code')
        }
        return JsonResponse(data, status=status.HTTP_200_OK)

class UpdateRoom(APIView):
    serializer_class = UpdateRoomSerializer

    def patch(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            guest_can_pause = serializer.data.get('guest_can_pause')
            votes_for_skip = serializer.data.get('votes_for_skip')
            code = serializer.data.get('code')

            queryset = Room.objects.filter(code=code)
            if not queryset.exists():
                return Response({'msg':'Room not found.'}, status=status.HTTP_404_NOT_FOUND)

                room = queryset[0]
                user_id = self.request.session_key
                if room.host != user_id:
                    return Response({'msg':'You are not the host of this room.'}, status=status.HTTP_HTTP_403_FORBIDDEN)

                room.guest_can_pause = guest_can_pause
                room.votes_for_skip = votes_for_skip
                room.save(update_fields=['guest_can_pause', 'votes_for_skip'])
                return Response(RoomSerializer(room).data, status=status.HTTP_200_OK)

        return Response({'BadRequest':'Invalid Data...'}, status=status.HTTP_400_BAD_REQUEST)
