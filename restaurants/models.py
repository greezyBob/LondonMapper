from django.db import models

# Create your models here.
class Restaurant(models.Model):
  name = models.CharField(max_length=250, default=None),
  address = models.CharField(max_length=300, default=None)
  yelp_id = models.CharField(default=None),
  url = models.CharField(default=None)
  owner = models.ForeignKey(
    'jwt_auth.User',
    related_name='restaurants'
  )


  def __str__(self):
    return f'{self.name}'
