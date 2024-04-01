from percent import create_percent_predictions
from LSTM_cache import create_cached_model
from datetime import datetime
from views import save_or_update_prediction
import random

def model_input(stock_ticker, start_date, day_to_predict):
    end_date = datetime.today().strftime('%Y-%m-%d')
    prediction_increase, accuracy_increase = create_cached_model(stock_ticker, start_date, end_date, day_to_predict)
    prediction_percent, accuracy_percent = create_percent_predictions(stock_ticker, start_date, end_date, day_to_predict)

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
    save_or_update_prediction(stock_ticker,day_to_predict,prediction_increase,lower_bound,upper_bound,selected_choice,accuracy_increase,accuracy_percent)
    


