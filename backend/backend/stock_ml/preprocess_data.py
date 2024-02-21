import yfinance as yf
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt 
from sklearn.preprocessing import MinMaxScaler
from keras.models import Sequential
from keras.layers import Dense, LSTM, Dropout


def fetch_stock_data(ticker, start_date, end_date):
    stock_data = yf.download(ticker, start=start_date, end=end_date)
    stock_data = stock_data.dropna()
    print(stock_data)
    return stock_data
    
def split_train_test_data(data, test_years):
    test_data = data[data.index > data.index.max() - pd.DateOffset(years=test_years)]
    train_data = data.drop(test_data.index)
    return train_data, test_data

def reshape_training_data(train_data):
    sc = MinMaxScaler(feature_range=(0,1))
    train_data = sc.fit_transform(train_data)  # Reshape to include a single feature
    return sc, train_data


def create_dataset(dataset, close_index, time_step=1):
    dataX, dataY = [], []
    # Adjust the range to stop time_step steps before the end of the dataset
    for i in range(len(dataset) - time_step):
        a = dataset[i:(i + time_step), :]
        dataX.append(a)
        # Ensure we're accessing the correct future point for prediction
        dataY.append(dataset[i + time_step, close_index])
    return np.array(dataX), np.array(dataY)


def main():
    stock_ticker = 'JPM'
    start_date = '2010-01-01'
    end_date = '2024-02-17'

    stock_data = fetch_stock_data(stock_ticker, start_date, end_date)
    train_data, test_data = split_train_test_data(stock_data, test_years=2)
    print(train_data)
    print(test_data)

    sc, train_data_scaled = reshape_training_data(train_data)
    # Creating a data structure with 60 time-steps and 1 output
    time_step = 20
    X_train, y_train = create_dataset(train_data_scaled,3, time_step)


    # Reshaping input to be [samples, time steps, features] which is required for LSTM
    # X_train = np.reshape(X_train, (X_train.shape[0], X_train.shape[1], 1))

    # Building the LSTM model
    model = Sequential()
    model.add(LSTM(units=50, return_sequences=True, input_shape=(X_train.shape[1], X_train.shape[2])))
    model.add(Dropout(0.2))
    model.add(LSTM(units=50, return_sequences=True))
    model.add(Dropout(0.2))
    model.add(LSTM(units=50))
    model.add(Dropout(0.2))
    model.add(Dense(units=1))

    # Compiling the model
    model.compile(optimizer='adam', loss='mean_squared_error')

    # Fitting the model
    # Fitting the model
    model.fit(X_train, y_train, epochs=100, batch_size=32)

    # Prepare test dataset
    test_data_scaled = sc.transform(test_data)  # Reshape test data similarly
    X_test, y_test = create_dataset(test_data_scaled, 3,time_step)
    
    # X_test = np.reshape(X_test, (X_test.shape[0], X_test.shape[1], 1))

    # Predictions
    predicted_stock_price = model.predict(X_test)
    print("+++++++++++++++++++++++")

    dummy_array = np.zeros_like(test_data_scaled)
    # Ensure the dummy array has the correct number of samples as your predictions
    # This part might need adjustment based on your specific dataset and predictions
    num_predictions = predicted_stock_price.shape[0]
    # Replace the 'Close' column in the dummy array with your predictions
    # Assuming 'Close' is at index 3 in your scaled dataset
    dummy_array[:num_predictions, 3] = predicted_stock_price.ravel()  # Flatten if necessary

    # Now inverse transform the modified dummy array
    predicted_stock_prices_original_scale = sc.inverse_transform(dummy_array)[:, 3]   # Inverse transform to get original scale
    # Plotting
    # Plotting
    adjusted_test_datetimes = test_data.index[time_step - 1 : time_step - 1 + num_predictions]

    # Make sure the slicing of predicted_stock_prices_original_scale aligns with the number of predictions
    # If necessary, adjust the slicing or ensure that the dummy array manipulation matches the prediction length
    predicted_stock_prices_original_scale = predicted_stock_prices_original_scale[:len(adjusted_test_datetimes)]

    # Plotting
    print(test_data['Close'][time_step:time_step+num_predictions])
    plt.plot(adjusted_test_datetimes, test_data['Close'][time_step:time_step+num_predictions], color='blue', label='Actual Stock Price')
    plt.plot(adjusted_test_datetimes, predicted_stock_prices_original_scale, color='red', label='Predicted Stock Price')

    plt.title('Stock Price Prediction')
    plt.xlabel('Time')
    plt.ylabel('Stock Price')
    plt.legend()
    plt.show()




if __name__ == "__main__":
    main()

