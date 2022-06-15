from rest_framework import serializers
from ..models import Journey
from jwt_auth.serializers.common import UserSerializer

class JourneySerializer(serializers.ModelSerializer):
  class Meta:
    model = Journey
    fields = '__all__'