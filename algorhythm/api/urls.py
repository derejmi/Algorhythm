from django.urls import path
<<<<<<< HEAD
from .views import RoomView, CreateRoomView, RetrieveRoom, JoinRoom, IsUserInRoom, UpdateRoom
=======

from .views import RoomView, CreateRoomView, RetrieveRoom, JoinRoom, IsUserInRoom, LeaveRoom

>>>>>>> 6ea6784d27cae650af01c547a1302496d3ebd4a8

urlpatterns =[
    path('room', RoomView.as_view()),
    path('create-room', CreateRoomView.as_view()),
    path('get-room', RetrieveRoom.as_view()),
    path('join-room', JoinRoom.as_view()),
    path('user-in-room', IsUserInRoom.as_view()),
<<<<<<< HEAD
    path('update-room', UpdateRoom.as_view())
=======
    path('leave-room', LeaveRoom.as_view())
>>>>>>> 6ea6784d27cae650af01c547a1302496d3ebd4a8
]