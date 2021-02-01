from django.urls import path
from .views import RoomView, RetrieveRoom

urlpatterns =[
    path('room', RoomView.as_view()),
    
    path('get-room', RetrieveRoom.as_view())
]