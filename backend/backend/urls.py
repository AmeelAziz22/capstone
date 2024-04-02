"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from . import views 

urlpatterns = [
    path('', views.home, name='home'),
    path('admin/', admin.site.urls),
    path('get-data/', views.get_data, name='get_data'),
    path('post-data/', views.post_data, name='post_data'),
    path('register/', views.register_user, name='register_user'),
    path('token/', views.authenticate_user, name='authenticate_user'),
    path('user/<int:userID>/stocks/', views.get_user_stocks, name='get_user_stocks'),
    path('user/<int:userID>/stock/update/', views.update_stock, name='update_stock'),
    # path('user/<int:userID>/stock/purchase/', views.purchase_stock, name='purchase_stock'),
    # path('user/<int:userID>/stock/sell/', views.sell_stock, name='sell_stock'),
    path('user/<int:userID>/portfolio/', views.get_user_portfolio, name='get_user_portfolio'),
    path('user/<int:userID>/portfolio_today/', views.get_user_portfolio_today, name='get_user_portfolio_today'),
    path('user/<int:userID>/generate_portfolio/', views.generate_portfolio, name='generate_portfolio'),
    path('api/model/<str:stock_symbol>/prediction/<int:days>/', views.get_stock_predictions, name='get_stock_predictions'),
    path('api/model/initialize', views.initialize_stock_predictions, name='initialize_stock_predictions'),

]
