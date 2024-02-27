from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
import json
from django.db.models import Sum
from backend_app.models import User, Account_Stock, PortfolioHistory
from datetime import datetime, timedelta
import yfinance as yf

@csrf_exempt  # For demo purposes only; consider using proper CSRF protection in production
def get_data(request):
    if request.method == 'GET':
        # Your logic to handle GET request
        data = [{'name': instance.name, 'age': instance.age} for instance in MyModel.objects.all()]
        return JsonResponse(data, safe=False)

@csrf_exempt  # For demo purposes only; consider using proper CSRF protection in production
def post_data(request):
    if request.method == 'POST':
        # Read the JSON data sent over in the POST request
        try:
            received_data = json.loads(request.body)
            print(received_data[0])
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data provided'}, status=400)

        # Your logic to handle the received data
        # For example, you can access specific fields from the JSON data
        #message = received_data.get('message', 'No message provided')

        # Construct the response JSON
        response_data = {'received_message': "jdjdjd"}

        return JsonResponse(response_data)
    else:
        # Handle cases where the request method is not POST
        return JsonResponse({'error': 'This endpoint only accepts POST requests'}, status=405)

# Assume you have a User and Stock model in your Django app

@csrf_exempt
def register_user(request):
    if request.method == 'POST':
        try:
            received_data = json.loads(request.body)
            User.objects.create(
                first_name=received_data['first_name'],
                last_name=received_data['last_name'],
                username=received_data['username'],
                password=received_data['password']
            )
            return JsonResponse({'message': 'User profile created successfully'})
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data provided'}, status=400)
    else:
        return JsonResponse({'error': 'This endpoint only accepts POST requests'}, status=405)
    
@csrf_exempt
def generate_portfolio(request, userID):
    if request.method == 'POST':
        # Read the JSON data sent over in the POST request
        try:
            user = User.objects.get(userID=userID)
            received_data = json.loads(request.body)
            for stock in received_data:
                new_stock = Account_Stock.objects.create(
                user=user,
                stock_symbol=stock['symbol'],
                shares=stock['shares'],
                average_price=stock['average_price']
                )
            
            combined_daily_sum = {}

            # Fetch historical data for the past 30 days for each stock and combine daily sums
            for stock in received_data:
                symbol = stock['symbol']
                shares = stock['shares']

                # Fetch historical data for the past 30 days
                end_date = datetime.today().strftime('%Y-%m-%d')
                start_date = (datetime.today() - timedelta(days=30)).strftime('%Y-%m-%d')
                data = yf.download(symbol, start=start_date, end=end_date)

                # Calculate daily sum for each day
                for date, row in data.iterrows():
                    daily_sum = row['Close'] * shares
                    if date.strftime('%Y-%m-%d') not in combined_daily_sum:
                        combined_daily_sum[date.strftime('%Y-%m-%d')] = daily_sum
                    else:
                        combined_daily_sum[date.strftime('%Y-%m-%d')] += daily_sum
                        
            for date, portfolio_sum in combined_daily_sum.items():
                PortfolioHistory.objects.create(
                    user=user,  # Provide the user instance here
                    date=datetime.strptime(date, '%Y-%m-%d'),
                    portfolio_sum=portfolio_sum
                )
            
            
            
                
            
        except (json.JSONDecodeError,User.DoesNotExist):
            return JsonResponse({'error': 'Invalid JSON data provided'}, status=400)

        # Your logic to handle the received data
        # For example, you can access specific fields from the JSON data


        return JsonResponse({'message': 'Portfolio setup request successful'})
    else:
        # Handle cases where the request method is not POST
        return JsonResponse({'error': 'This endpoint only accepts POST requests'}, status=405)


@csrf_exempt
def authenticate_user(request):
    if request.method == 'POST':
        try:
            received_data = json.loads(request.body)
            user = User.objects.get(username=received_data['username'], password=received_data['password']) 
            return JsonResponse({'message': 'Authentication successful','user_id': user.userID})
        except User.DoesNotExist:
            return JsonResponse({'error': 'Authentication failed'}, status=401)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data provided'}, status=400)
    else:
        return JsonResponse({'error': 'This endpoint only accepts POST requests'}, status=405)

@csrf_exempt
def get_user_stocks(request, userID):
    try:
        user = User.objects.get(userID=userID)
        stocks = Account_Stock.objects.filter(user=user)

        stocks_data = [
            {
                "symbol": stock.stock_symbol,
                "shares": stock.shares,
                "average_price": stock.average_price,
                # Add logic to fetch current_price and price_change from an external source or update your model accordingly
                "current_price": 0.0,
                "price_change": 0.0
            }
            for stock in stocks
        ]
        return JsonResponse(stocks_data, safe=False)
    except User.DoesNotExist:
        return JsonResponse({'error': 'User not found'}, status=404)

@csrf_exempt
def purchase_stock(request, userID):
    if request.method == 'POST':
        try:
            user = User.objects.get(userID=userID)
            received_data = json.loads(request.body)

            # Update the model fields based on your actual request data
            new_stock = Account_Stock.objects.create(
                user=user,
                stock_symbol=received_data['symbol'],
                shares=received_data['shares'],
                average_price=received_data['average_price']
            )

            return JsonResponse({'message': 'Stock purchase request successful'})
        except (json.JSONDecodeError, User.DoesNotExist):
            return JsonResponse({'error': 'Invalid JSON data provided or User not found'}, status=400)
    else:
        return JsonResponse({'error': 'This endpoint only accepts POST requests'}, status=405)

@csrf_exempt
def sell_stock(request, userID):
    if request.method == 'POST':
        try:
            user = User.objects.get(userID=userID)
            received_data = json.loads(request.body)

            # Your logic to handle stock selling request
            # Example: Update the Stock object in the database with sell details
            # For simplicity, let's assume we delete the stock for selling
            stock_to_sell = Account_Stock.objects.get(user=user, stock_symbol=received_data['symbol'])
            stock_to_sell.delete()

            return JsonResponse({'message': 'Stock sell request successful'})
        except (json.JSONDecodeError, User.DoesNotExist, Account_Stock.DoesNotExist):
            return JsonResponse({'error': 'Invalid JSON data provided or User/Stock not found'}, status=400)
    else:
        return JsonResponse({'error': 'This endpoint only accepts POST requests'}, status=405)

@csrf_exempt
def get_user_portfolio(request, userID):
    try:
        user = User.objects.get(userID=userID)
        # Assuming "days" is provided in the request, update accordingly
        days = 30
        today = datetime.now().date()
        start_date = today - timedelta(days=days)
        portfolio_data = PortfolioHistory.objects.filter(user=user, date__gte=start_date)

        portfolio_data_list = [
            {
                "date": entry.date.strftime('%Y-%m-%d'),
                "total_value": entry.portfolio_sum
            }
            for entry in portfolio_data
        ]
        return JsonResponse(portfolio_data_list, safe=False)
    except User.DoesNotExist:
        return JsonResponse({'error': 'User not found'}, status=404)

@csrf_exempt
def get_user_portfolio_today(request, userID):
    try:
        user = User.objects.get(userID=userID)
        today_portfolio_value = PortfolioHistory.objects.filter(user=user, date=datetime.now().date()).aggregate(Sum('portfolio_sum'))['portfolio_sum__sum']
        return JsonResponse({'todays_value': today_portfolio_value})
    except User.DoesNotExist:
        return JsonResponse({'error': 'User not found'}, status=404)
# default page
def home(request):
    return HttpResponse("Welcome to the homepage!")
