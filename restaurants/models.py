from django.db import models

# Create your models here.
class Restaurant(models.Model):
  name = models.CharField(max_length=250, default=None),
  address = models.CharField(max_length=300, default=None)
  yelp_id = models.CharField(max_length=300, default=None),
  url = models.CharField(max_length=500, default=None)
  owner = models.ForeignKey(
    'jwt_auth.User',
    related_name='restaurants',
    on_delete=models.CASCADE,
    default=1
  )


  def __str__(self):
    return f'{self.name}'
