from rest_framework import serializers
from .models import Room

class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ('id', 'code', 'host', 'email', 'can_guests_pause', 'votes_for_skip', 'created_date')

class CreateRoomSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Room
        fields = ('email','can_guests_pause', 'votes_for_skip')

class UpdateRoomSerializer(serializers.ModelSerializer):
    code = serializers.CharField(validators=[])
    
    class Meta:
        model = Room
        fields = ('can_guests_pause', 'votes_for_skip', 'code')