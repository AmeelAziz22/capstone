import threading
from backend_app.models import StockPrediction

def get_all_models():
  
  
  models = {}
  
  all_models = StockPrediction.objects.all()
  
  for model in all_models:
    stock_symbol = model.stock_symbol
    time = model.time
    
    models[stock_symbol] = time
    
  print(models)
  return models
  
  

def process_data(key, value):
    print("Thread {}: Processing {} - {}".format(threading.current_thread().name, key, value))

# Example dictionary
data_dict = {
    'key1': 'value1',
    'key2': 'value2',
    'key3': 'value3',
    # Add more key-value pairs as needed
}

# Create and start threads for each item in the dictionary
threads = []
for key, value in data_dict.items():
    thread = threading.Thread(target=process_data, args=(key, value))
    threads.append(thread)
    thread.start()

# Wait for all threads to finish
for thread in threads:
    thread.join()

print("All threads have finished execution.")
