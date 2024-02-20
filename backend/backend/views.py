from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
import json

@csrf_exempt  # For demo purposes only; consider using proper CSRF protection in production
def get_data(request):
    if request.method == 'GET':
        # Your logic to handle GET request
        data = {'message': 'This is a GET request'}
        return JsonResponse(data)

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
      
def home(request):
    return HttpResponse("Welcome to the homepage!")
