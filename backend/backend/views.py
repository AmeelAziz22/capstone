from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse

@csrf_exempt  # For demo purposes only; consider using proper CSRF protection in production
def get_data(request):
    if request.method == 'GET':
        # Your logic to handle GET request
        data = {'message': 'This is a GET request'}
        return JsonResponse(data)

@csrf_exempt  # For demo purposes only; consider using proper CSRF protection in production
def post_data(request):
    if request.method == 'POST':
        # Your logic to handle POST request
        data = {'message': 'This is a POST request'}
        return JsonResponse(data)
      
def home(request):
    return HttpResponse("Welcome to the homepage!")
