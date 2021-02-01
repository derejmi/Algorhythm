from django.urls import path
from .views import RoomView, CreateRoomView, RetrieveRoom

urlpatterns =[
    path('room', RoomView.as_view()),
    path('create-room', CreateRoomView.as_view())
    path('get-room', RetrieveRoom.as_view())
]