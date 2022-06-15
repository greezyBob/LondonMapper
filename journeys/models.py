from email.policy import default
from django.db import models


# Create your models here.
class Journey(models.Model):
  start = models.CharField(max_length=350, default=None)
  end = models.CharField(max_length=350, default=None)
  duration = models.PositiveIntegerField(default=None)
  cost = models.PositiveIntegerField(default=None)
  legs =  models.JSONField(default=None)
  modes = models.JSONField(default=None)
  owner = models.ForeignKey(
    'jwt_auth.User',
    related_name='journeys',
    on_delete=models.CASCADE,
    default=1
  )
 