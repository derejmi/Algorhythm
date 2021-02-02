from django.urls import path
from .views import RoomView, CreateRoomView, RetrieveRoom, JoinRoom, IsUserInRoom, UpdateRoom, LeaveRoom


urlpatterns =[
    path('room', RoomView.as_view()),
    path('create-room', CreateRoomView.as_view()),
    path('get-room', RetrieveRoom.as_view()),
    path('join-room', JoinRoom.as_view()),
    path('user-in-room', IsUserInRoom.as_view()),
    path('leave-room', LeaveRoom.as_view()),
    path('update-room', UpdateRoom.as_view())
]