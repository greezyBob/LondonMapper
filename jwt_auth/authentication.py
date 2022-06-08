from rest_framework.authentication import BasicAuthentication
from rest_framework.exceptions import PermissionDenied
from django.contrib.auth import get_user_model
User = get_user_model()

from django.conf import settings

#jwt
import jwt
 
class JWTAuthentication(BasicAuthentication):

  def authenticate(self, request):
    # ensure authorizatoin header exists
    header = request.headers.get('Authorization')
    if not header:
      return None

    # check token is valid format
    if not header.startswith('Bearer'):
      raise PermissionDenied(detail='Auth token is invalid')
    
    token = header.replace('Bearer ', '')

    try:
      # 1st argument is token, 2nd is secret, 3rd is algorithm
      payload = jwt.decode(token, settings.SECRET_KEY, ['HS256'])
      user = User.objects.get(pk=payload.get('sub'))
      
    except jwt.exceptions.InvalidTokenError:
      raise PermissionDenied(detail='Invalid token')
    # when sub is not = pk
    except User.DoesNotExist:
      raise PermissionDenied(detail='User not found')

    # user is authenticated - tuple(user, auth) will be on the request -> request.user
    return (user, token)