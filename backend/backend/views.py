from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
import json
from django.db.models import Sum
from backend_app.models import User, Account_Stock, PortfolioHistory, StockPrediction
from datetime import datetime, timedelta
import yfinance as yf

@csrf_exempt
def get_data(request):
    if request.method == 'GET':
        # Your logic to handle GET request
        data = [{'first_name': user.first_name, 'last_name': user.last_name} for user in User.objects.all()]
        return JsonResponse(data, safe=False)
    else:
        return JsonResponse({'error': 'This endpoint only accepts GET requests'}, status=405)


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

@csrf_exempt
def register_user(request):
    if request.method == 'POST':
        try:
            received_data = json.loads(request.body)

            # Check if a user with the provided username already exists
            if User.objects.filter(username=received_data['username']).exists():
                return JsonResponse({'error': 'User with this username already exists'}, status=400)

            # Create a new user profile
            user = User.objects.create(
                first_name=received_data['first_name'],
                last_name=received_data['last_name'],
                username=received_data['username'],
                password=received_data['password']
            )
            return JsonResponse({'message': 'User profile created successfully', 'userID': user.userID})
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
                shares=float(stock['shares']),
                average_price=float(stock['average_price'])
                )
            
            combined_daily_sum = {}

            # Fetch historical data for the past 30 days for each stock and combine daily sums
            for stock in received_data:
                symbol = stock['symbol']
                shares = float(stock['shares'])

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

        stocks_data = []

        for stock in stocks:
            # Fetch data for the stock using yfinance
            data = yf.Ticker(stock.stock_symbol)
            
            # Get the current closed price
            current_price = data.history(period="1d")['Close'][0]
            
            # Calculate price change
            price_change = (current_price /stock.average_price) * 100 - 100
            
            # Append data to stocks_data
            stocks_data.append({
                "symbol": stock.stock_symbol,
                "shares": stock.shares,
                "average_price": stock.average_price,
                "current_price": current_price,
                "price_change": price_change
            })

        return JsonResponse(stocks_data, safe=False)
    except User.DoesNotExist:
        return JsonResponse({'error': 'User not found'}, status=404)

@csrf_exempt
def update_stock(request, userID):
    if request.method == 'POST':
        try:
            received_data = json.loads(request.body)
            user = User.objects.get(userID=userID)

            # Check if the stock exists for the given user and symbol
            try:
                stock_to_update = Account_Stock.objects.get(user=user, stock_symbol=received_data['symbol'])
            except Account_Stock.DoesNotExist:
                stock_to_update = None

            # Check if 'shares' key is present in received_data
            if 'shares' in received_data:
                new_shares = received_data['shares']

                if stock_to_update:
                    # Update shares and check if it becomes 0 (sold out), remove the stock
                    if new_shares == 0:
                        stock_to_update.delete()
                        return JsonResponse({'message': 'Stock update successful'})
                    elif float(new_shares) < 0:
                        return JsonResponse({'message': 'Cannot have negative quantities of shares'})
                    else:
                        stock_to_update.shares = new_shares
                else:
                    # Stock doesn't exist, create a new entry in the database
                    Account_Stock.objects.create(
                        user=user,
                        stock_symbol=received_data['symbol'],
                        shares=new_shares,
                        average_price=received_data.get('average_price', 0.0) # (TODO) Change from 0.0 to whatever price is/calculate average price
                    )

            # Check if 'average_price' key is present in received_data and stock exists
            if 'average_price' in received_data and stock_to_update:
                stock_to_update.average_price = received_data['average_price']

            # Save the changes to the database
            if stock_to_update:
                stock_to_update.save()

            return JsonResponse({'message': 'Stock update successful'})
        except (json.JSONDecodeError, User.DoesNotExist):
            return JsonResponse({'error': 'Invalid JSON data provided or User not found'}, status=400)
    else:
        return JsonResponse({'error': 'This endpoint only accepts POST requests'}, status=405)

# @csrf_exempt
# def purchase_stock(request, userID):
#     if request.method == 'POST':
#         try:
#             user = User.objects.get(userID=userID)
#             received_data = json.loads(request.body)
#
#             # Update the model fields based on your actual request data
#             new_stock = Account_Stock.objects.create(
#                 user=user,
#                 stock_symbol=received_data['symbol'],
#                 shares=received_data['shares'],
#                 average_price=received_data['average_price']
#             )
#
#             return JsonResponse({'message': 'Stock purchase request successful'})
#         except (json.JSONDecodeError, User.DoesNotExist):
#             return JsonResponse({'error': 'Invalid JSON data provided or User not found'}, status=400)
#     else:
#         return JsonResponse({'error': 'This endpoint only accepts POST requests'}, status=405)

# @csrf_exempt
# def sell_stock(request, userID):
#     if request.method == 'POST':
#         try:
#             user = User.objects.get(userID=userID)
#             received_data = json.loads(request.body)
#
#             # Your logic to handle stock selling request
#             # Example: Update the Stock object in the database with sell details
#             # For simplicity, let's assume we delete the stock for selling
#             stock_to_sell = Account_Stock.objects.get(user=user, stock_symbol=received_data['symbol'])
#             stock_to_sell.delete()
#
#             return JsonResponse({'message': 'Stock sell request successful'})
#         except (json.JSONDecodeError, User.DoesNotExist, Account_Stock.DoesNotExist):
#             return JsonResponse({'error': 'Invalid JSON data provided or User/Stock not found'}, status=400)
#     else:
#         return JsonResponse({'error': 'This endpoint only accepts POST requests'}, status=405)

@csrf_exempt
def get_user_portfolio(request, userID):
    try:
        user = User.objects.get(userID=userID)
        # Assuming "days" is provided in the request, update accordingly
        days = 30 # (TODO) Be able to change the amount of days
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
        return JsonResponse(portfolio_data_list, safe=False) # (TODO) Be able to create a graph that can be broken down by stock.
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

@csrf_exempt
def update_predictions(request, stock):
    if request.method == 'POST':
        try:
            received_data = json.loads(request.body)
            stock = StockPrediction.objects.get(stock_symbol = stock.stock_symbol, time = stock.time, increase = stock.increase, percent = stock.percent, indicator = stock.indicator, increase_accuracy = stock.increase_accuracy, percent_accuracy = stock.percent_accuracy)
            try:
                stock_to_update = StockPrediction.objects.get(stock_symbol=stock.stock_symbol)
            except StockPrediction.DoesNotExist:
                stock_to_update = None
            # Save the changes to the database
            if stock_to_update:
                stock_to_update.save()
        except (json.JSONDecodeError, stock.DoesNotExist):
            return JsonResponse({'error': 'Invalid JSON data provided or Stock not found'}, status=400)
    else:
        return JsonResponse({'error': 'This endpoint only accepts POST requests'}, status=405)

# default page
def home(request):
    return HttpResponse("Welcome to the homepage!")
