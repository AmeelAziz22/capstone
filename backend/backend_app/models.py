from django.db import models
from django.contrib.auth.models import User
from django.db.models import DateTimeField, FloatField


class MyModel(models.Model):
    name = models.CharField(max_length=100)
    age = models.IntegerField()
    email = models.EmailField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class User(models.Model):
    userID = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    username = models.CharField(max_length=100)
    password = models.CharField(max_length=100)

    def __str__(self):
        return f'{self.first_name} {self.last_name}'




class Account_Stock(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    stock_order_id = models.AutoField(primary_key=True)
    stock_symbol = models.CharField(max_length=10)
    shares = models.FloatField()
    average_price = models.FloatField()

    def __str__(self):
        return f'{self.user.username} - {self.stock_symbol}'
    



class PortfolioHistory(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    port_history_id = models.AutoField(primary_key=True)
    date = models.DateTimeField()
    portfolio_sum = models.FloatField()

    def __str__(self):
        return f'{self.user.username} - {self.date}'