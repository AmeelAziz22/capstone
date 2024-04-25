from .percent import create_percent_predictions
from .LSTM_cache import create_cached_model
from .percent_peak import create_percent_peak_predictions
from datetime import datetime
from backend_app.models import User, Account_Stock, PortfolioHistory, StockPrediction
import random
import yfinance as yf
import threading
import numpy as np
from django.utils import timezone

def save_or_update_prediction(stock_symbol, time, increase, low_percent, high_percent, indicator, increase_accuracy, percent_accuracy, last_update, peak_high, peak_min):
    try:
        prediction = StockPrediction.objects.get(stock_symbol=stock_symbol, time=time)
        
        # Update existing prediction
        prediction.increase = increase
        prediction.low_percent = low_percent
        prediction.high_percent = high_percent
        prediction.indicator = indicator
        prediction.increase_accuracy = increase_accuracy
        prediction.percent_accuracy = percent_accuracy
        prediction.peak_high = peak_high
        prediction.peak_min = peak_min
        prediction.last_update = last_update
        prediction.save()
        
        return f"Prediction for {stock_symbol} at time {time} updated successfully."

    except StockPrediction.DoesNotExist:
        # Create a new prediction if it doesn't exist
        prediction = StockPrediction(
            stock_symbol=stock_symbol,
            time=time,
            increase=increase,
            low_percent=low_percent,
            high_percent=high_percent,
            indicator=indicator,
            increase_accuracy=increase_accuracy,
            percent_accuracy=percent_accuracy,
            peak_high = peak_high,
            peak_min = peak_min,
            last_update = last_update,

        )
        prediction.save()
        
        return f"Prediction for {stock_symbol} at time {time} saved successfully."

    except Exception as e:
        return f"Error saving or updating prediction: {str(e)}"
    
def model_input(stock_ticker, start_date, day_to_predict):
    end_date = datetime.today().strftime('%Y-%m-%d')
    prediction_increase, accuracy_increase = create_cached_model(stock_ticker, start_date, end_date, day_to_predict)
    prediction_percent, accuracy_percent = create_percent_predictions(stock_ticker, start_date, end_date, day_to_predict)
    max_date, min_date = create_percent_peak_predictions(stock_ticker, start_date, end_date, day_to_predict)

    lower_bound, upper_bound = map(int, prediction_percent.split(" to "))

    if (prediction_increase == 1 and upper_bound < 0):
        lower_bound = 0
        upper_bound = 10
    elif prediction_increase == 0 and upper_bound > 0:
        lower_bound = -10
        upper_bound = 0
    
    
    choices = ['stock history', 'sector', 'economy']
    weights = [0.7, 0.2, 0.1]

    # Randomly choose from the choices with the specified probabilities
    selected_choice = random.choices(choices, weights=weights)[0]
    save_or_update_prediction(stock_ticker,day_to_predict,prediction_increase,lower_bound,upper_bound,selected_choice,accuracy_increase,accuracy_percent, peak_high=max_date, peak_min=min_date, last_update=timezone.now().isoformat())
    print("saved")




def initialize_db():
    num_stocks = 100
    popular_stocks = [
    'AAPL', 'MSFT', 'AMZN', 'GOOGL', 'FB', 'TSLA', 'NVDA', 'BABA', 'BRK-A', 'BRK-B',
    'JPM', 'JNJ', 'V', 'PG', 'MA', 'DIS', 'PYPL', 'UNH', 'HD', 'CRM', 'NVDA', 'VZ',
    'ADBE', 'TSM', 'BAC', 'XOM', 'CMCSA', 'INTC', 'NFLX', 'KO', 'MRK', 'ABBV', 'PEP',
    'NKE', 'CSCO', 'WMT', 'CVX', 'QCOM', 'ORCL', 'T', 'PFE', 'ABT', 'TMO', 'NEE',
    'AVGO', 'UNP', 'MDT', 'ACN', 'TXN', 'LLY', 'AMGN', 'IBM', 'COST', 'LIN', 'DHR',
    'GILD', 'SBUX', 'MMM', 'FIS', 'PM', 'WFC', 'BDX', 'MU', 'INTU', 'LOW', 'ISRG',
    'ANTM', 'AXP', 'NOW', 'SYK', 'GS', 'HON', 'CME', 'AMAT', 'CHTR', 'CAT', 'SPGI',
    'RTX', 'PLD', 'BKNG', 'LMT', 'MMM', 'ISRG', 'TMO', 'MDT', 'VRTX', 'SO', 'ICE',
    'BIIB', 'ADP', 'EL', 'HCA', 'ZTS', 'SPG', 'GD', 'VRTX', 'SHW', 'MU', 'WLTW'
    ]
    time = [10,20,60,120,240]
    start_date = '2010-01-01'
    
    # Function to handle threading for a given stock and time
    def process_stock_time(stock_ticker, day_to_predict):
        model_input(stock_ticker, start_date, day_to_predict)

    # Number of threads to run concurrently
    max_threads = 8

    # Create threads for each combination of stock and time
    threads = []
    for stock_ticker in popular_stocks:
        for day_to_predict in time:
            # Start a new thread
            thread = threading.Thread(target=process_stock_time, args=(stock_ticker, day_to_predict))
            threads.append(thread)
            thread.start()

            # Limit the number of concurrent threads
            if len(threads) >= max_threads:
                for thread in threads:
                    thread.join()  # Wait for threads to finish
                threads = []

    # Wait for remaining threads to finish
    for thread in threads:
        thread.join()







