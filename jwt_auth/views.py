from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import PermissionDenied, ValidationError
from datetime import datetime, timedelta # timestamps
from django.conf import settings
import jwt

from .serializers.common import UserSerializer

# from django.contrib.auth.hashers import check_password
from django.contrib.auth import get_user_model
User = get_user_model()

# Create your views here.
class RegisterView(APIView):

  def post(self, request):
    user_to_add = UserSerializer(data=request.data)
    try:
      user_to_add.is_valid(True)
      user_to_add.save()
      return Response({ 'message': 'Registration Successful' }, status.HTTP_202_ACCEPTED)

    except ValidationError:
            return Response(user_to_add.errors, status.HTTP_422_UNPROCESSABLE_ENTITY)

    except Exception as e:   
      return Response({ 'detail': str(e) }, status.HTTP_422_UNPROCESSABLE_ENTITY)


class LoginView(APIView):

  def post(self, request):
    email = request.data.get('email')
    password = request.data.get('password')
    try:
      user_to_validate = User.objects.get(email=email)
    except User.DoesNotExist:
      raise PermissionDenied('Email or password does not match')
    
    if not user_to_validate.check_password(password):
      raise PermissionDenied('Email or password does not match')

    # create token
    dt = datetime.now() + timedelta(hours=3)
    token = jwt.encode(
      {
      'sub': user_to_validate.id,
      'exp': int(dt.strftime('%s'))
      },
      settings.SECRET_KEY,
      algorithm='HS256'
    )

    return Response({ 'message': f'Welcome back {user_to_validate.username}', 'token': token }, status.HTTP_202_ACCEPTED)