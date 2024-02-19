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
    return stock_data
    
def split_train_test_data(data, test_years):
    test_data = data[data.index > data.index.max() - pd.DateOffset(years=test_years)]
    train_data = data.drop(test_data.index)
    return train_data, test_data

def reshape_training_data(train_data):
    sc = MinMaxScaler(feature_range=(0,1))
    train_data = sc.fit_transform(train_data.values.reshape(-1, 1))  # Reshape to include a single feature
    return sc, train_data


def create_dataset(dataset, time_step=1):
    dataX, dataY = [], []
    for i in range(len(dataset) - time_step - 1):
        a = dataset[i:(i + time_step), 0]
        dataX.append(a)
        dataY.append(dataset[i + time_step, 0])
    return np.array(dataX), np.array(dataY)

def main():
    stock_ticker = 'AAPL'
    start_date = '2010-01-01'
    end_date = '2024-02-17'

    stock_data = fetch_stock_data(stock_ticker, start_date, end_date)
    train_data, test_data = split_train_test_data(stock_data, test_years=3)

    sc, train_data_scaled = reshape_training_data(train_data)

    # Creating a data structure with 60 time-steps and 1 output
    time_step = 60
    X_train, y_train = create_dataset(train_data_scaled, time_step)

    y_train = train_data['Close'].values[time_step+1:]

    # Reshaping input to be [samples, time steps, features] which is required for LSTM
    X_train = np.reshape(X_train, (X_train.shape[0], X_train.shape[1], 1))

    # Building the LSTM model
    model = Sequential()
    model.add(LSTM(units=50, return_sequences=True, input_shape=(X_train.shape[1], 1)))
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
    model.fit(X_train, y_train, epochs=1, batch_size=32)

    # Prepare test dataset
    test_data_scaled = sc.transform(test_data.values.reshape(-1, 1))  # Reshape test data similarly
    X_test, y_test = create_dataset(test_data_scaled, time_step)
    X_test = np.reshape(X_test, (X_test.shape[0], X_test.shape[1], 1))

    # Predictions
    predicted_stock_price = model.predict(X_test)
    predicted_stock_price = sc.inverse_transform(predicted_stock_price)  # Inverse transform to get original scale
    # Plotting
    # Plotting
    test_datetimes = test_data.index[time_step+1:]
    plt.plot(test_datetimes, test_data['Close'][time_step+1:], color='blue', label='Actual Stock Price')
    # print(test_data)
    # print( test_data['Close'][time_step+1:])

    # Transform predicted stock prices back to original scale
    predicted_stock_price_filtered_original_scale = sc.inverse_transform(predicted_stock_price.reshape(-1, 1))
    predicted_stock_price_filtered_original_scale = predicted_stock_price_filtered_original_scale[:len(test_datetimes)]


    plt.plot(test_datetimes, predicted_stock_price_filtered_original_scale, color='red', label='Predicted Stock Price')

    plt.title('Stock Price Prediction')
    plt.xlabel('Time')
    plt.ylabel('Stock Price')
    plt.legend()
    plt.show()




if __name__ == "__main__":
    main()

