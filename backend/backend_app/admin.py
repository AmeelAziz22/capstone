from django.contrib import admin
from .models import MyModel
from .models import User
from .models import Account_Stock
from .models import PortfolioHistory

admin.site.register(MyModel)

admin.site.register(User)

admin.site.register(Account_Stock)

admin.site.register(PortfolioHistory)

