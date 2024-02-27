from django.db import models

# Create your models here.
class Stock(models.Model):
    code = models.CharField()
    price = models.CharField()
    volume = models.CharField()
    owner = models.CharField()