from rest_framework import serializers
from .models import Room

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('id', 'code', 'host_name','guest_can_pause', 'votes_to_skip', 'date_created')

class CreateRoomSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Room
        fields = ('guest_can_pause', 'votes_to_skip')