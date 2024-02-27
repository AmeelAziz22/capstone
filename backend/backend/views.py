from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
import json
from backend_app.models import User

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
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data provided'}, status=400)

        # Your logic to handle the received data
        # For example, you can access specific fields from the JSON data
        message = received_data.get('message', 'No message provided')

        # Construct the response JSON
        response_data = {'received_message': message}

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
    # Your logic to retrieve user stocks from the database based on userID
    # Example: stocks = Stock.objects.filter(user=userID)
    # Create a list of dictionaries with stock information
    stocks_data = [
        {
            "symbol": "AAPL",
            "shares": 25,
            "average_price": 150.25,
            "current_price": 160.50,
            "price_change": 10.25
        },
        {
            "symbol": "GOOGL",
            "shares": 15,
            "average_price": 300.50,
            "current_price": 310.75,
            "price_change": 10.25
        },
        # Add more entries for other stocks
    ]
    return JsonResponse(stocks_data, safe=False)

@csrf_exempt
def purchase_stock(request, userID):
    if request.method == 'POST':
        try:
            received_data = json.loads(request.body)
            # Your logic to handle stock purchase request
            # Example: Create a new Stock object in the database with purchase details
            return JsonResponse({'message': 'Stock purchase request successful'})
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data provided'}, status=400)
    else:
        return JsonResponse({'error': 'This endpoint only accepts POST requests'}, status=405)

@csrf_exempt
def sell_stock(request, userID):
    if request.method == 'POST':
        try:
            received_data = json.loads(request.body)
            # Your logic to handle stock selling request
            # Example: Update the Stock object in the database with sell details
            return JsonResponse({'message': 'Stock sell request successful'})
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data provided'}, status=400)
    else:
        return JsonResponse({'error': 'This endpoint only accepts POST requests'}, status=405)

@csrf_exempt
def get_user_portfolio(request, userID):
    # Your logic to retrieve user portfolio history from the database based on userID and days parameter
    # Example: portfolio_data = Portfolio.objects.filter(user=userID, date__gte=(today - timedelta(days=days)))
    # Create a list of dictionaries with portfolio information
    portfolio_data = [
        {
            "date": "2022-01-15",
            "total_value": 15000.00
        },
        {
            "date": "2022-01-16",
            "total_value": 15500.50
        },
        # Add more entries for the past 30 days
    ]
    return JsonResponse(portfolio_data, safe=False)

@csrf_exempt
def get_user_portfolio_today(request, userID):
    # Your logic to retrieve today's portfolio sum from the database based on userID
    # Example: today_portfolio_value = Portfolio.objects.filter(user=userID, date=today).aggregate(Sum('total_value'))
    today_portfolio_value = 14484.00  # Placeholder value, replace with actual value from database
    return JsonResponse({'todays_value': today_portfolio_value})

# default page
def home(request):
    return HttpResponse("Welcome to the homepage!")
