from dataclasses import fields
from rest_framework import serializers
from django.contrib.auth import get_user_model 
from  django.contrib.auth.hashers import make_password
from django.core.exceptions import ValidationError

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):

  # password fields as readonly
  password = serializers.CharField(write_only=True) # never returned when converting to JSON
  password_confirmation = serializers.CharField(write_only=True)

  def validate(self, data):
    # check passwords match and hash
    password = data.pop('password')
    password_confirmation = data.pop('password_confirmation')

    
    if password != password_confirmation:
      raise ValidationError({
        'password_confirmation': 'Does not match password'
      })

    # optional checks strength of password
    # try:
    #   password_validation.validate_password(password)
    # except ValidationError as e: 
    #   raise ValidationError({
    #     'password': e.messages
    #   })

    #hash password
    data['password'] = make_password(password)

    return data

  class Meta:
    model = User
    fields = '__all__'