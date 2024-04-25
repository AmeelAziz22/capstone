import yfinance as yf
from yahooquery import Ticker
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt 
from sklearn.preprocessing import MinMaxScaler, LabelEncoder
from keras.models import Sequential
from keras.metrics import Precision
from keras.layers import Dense, LSTM, Dropout
from sklearn.metrics import accuracy_score, classification_report
from keras.utils import to_categorical
import keras.backend as K
from sklearn.metrics import mean_squared_error, r2_score

def r_squared(y_true, y_pred):
    SS_res =  K.sum(K.square(y_true - y_pred)) 
    SS_tot = K.sum(K.square(y_true - K.mean(y_true))) 
    return 1 - SS_res/(SS_tot + K.epsilon())

def standard_deviation(y_true, y_pred):
    return K.std(y_pred)



def fetch_stock_data(ticker, start_date, end_date):
    stock_data = yf.download(ticker, start=start_date, end=end_date)
    stock_data = stock_data.dropna()
    ticker_stock = Ticker(ticker)
    profile = ticker_stock.asset_profile
    sector = profile[ticker]['sector']
    print(sector)
    index = {
        "Technology": "XLK",
        "Healthcare": "XLV",
        "Financial Services": "XLF",
        "Consumer Discretionary": "XLY",
        "Consumer Staples": "XLP",
        "Energy": "XLE",
        "Industrial": "XLI",
        "Materials": "XLB",
        "Real Estate": "XLRE",
        "Utilities": "XLU"
    }
    sector_ticker = index.get(sector)
    if sector_ticker:
        sector_stock = yf.download(sector_ticker, start=start_date, end=end_date)[['Close']].dropna()
        sector_stock.columns = [f'{sector}_Close']  # Rename column to avoid conflicts

        stock_data = pd.merge(stock_data, sector_stock, how='left', left_index=True, right_index=True)
    
    economy_indicator_data = yf.download('VTI', start=start_date, end=end_date)[['Close']].dropna()
    economy_indicator_data.columns = [f"{'VTI'}_Close"]
    stock_data = pd.merge(stock_data, economy_indicator_data, how='left', left_index=True, right_index=True)

    print(stock_data)
    return stock_data

def add_target_column(data, future_days):
    # Shift the 'Close' price future_days into the future
    data['Future_Close'] = data['Close'].shift(future_days)

    # Calculate the percent change
    data['Percent_Change'] = ((data['Future_Close'] - data['Close']) / data['Close']) * 100

    # Set the target column as the percent change
    data['Target'] = data['Percent_Change']

    data['Increase'] = (data['Percent_Change'] > 0).astype(int)

    # Drop rows with NaN values that result from the shift operation
    data.dropna(inplace=True)

    print(data)

    print(data.columns)

    data.drop(['Future_Close', 'Percent_Change'], axis=1, inplace=True)

    # Select only the necessary columns

    return data

    
def split_train_test_data(data, test_days):
    print(data.columns)
    test_data = data.tail(test_days)  # Take the last 'test_days' days of data
    train_data = data.iloc[:-test_days]  # Exclude the last 'test_days' days for training
    return train_data, test_data


def reshape_training_data(train_data):
    # Assuming 'Target' is the last column, extract all columns except the last as features
    features = train_data.iloc[:, :-1]
    target = train_data.iloc[:, -1]  # The 'Target' column
    
    # Initialize the MinMaxScaler
    sc = MinMaxScaler(feature_range=(0,1))
    
    # Fit and transform the features
    features_scaled = sc.fit_transform(features)
    
    # No need to scale the target for classification problems
    
    return sc, features_scaled, target


def create_dataset(dataset, close_index, time_step=1):
    dataX, dataY = [], []
    # Adjust the range to stop time_step steps before the end of the dataset
    for i in range(len(dataset) - time_step):
        a = dataset[i:(i + time_step), :close_index]  # Exclude close_index column
        dataX.append(a)
        # Ensure we're accessing the correct future point for prediction
        dataY.append(dataset[i + time_step, close_index])
        if i == 0:
            print("Dataset for first iteration:", dataset[i:i+time_step+1])
            print("DataX for first iteration:", a)
            print("DataY for first iteration:", dataset[i + time_step, close_index])
    return np.array(dataX), np.array(dataY)




def r_squared(y_true, y_pred):
    SS_res =  K.sum(K.square(y_true - y_pred)) 
    SS_tot = K.sum(K.square(y_true - K.mean(y_true))) 
    return ( 1 - SS_res/(SS_tot + K.epsilon()) )

def create_model(X_train, y_train, epochs_chosen, batch_size_chosen):
    model = Sequential()
    print("Shape of X_train:", X_train.shape)
    X_train_reshaped = X_train.reshape(X_train.shape[0], X_train.shape[1], 1)

    model.add(LSTM(units=20, input_shape=(X_train_reshaped.shape[1], X_train_reshaped.shape[2])))

    model.add(Dropout(0.2))
    model.add(Dense(units=1, activation='linear'))  # Adjust for regression

    model.compile(optimizer='adam', loss='mean_squared_error', metrics=[r_squared])

    model.fit(X_train, y_train, epochs=epochs_chosen, batch_size=batch_size_chosen)

    return model



def main():
    stock_ticker = 'NVDA'
    start_date = '2010-01-01'
    end_date = '2024-04-23'
    ticker = Ticker(stock_ticker)
    profile = ticker.asset_profile
    sector = profile[stock_ticker]['sector']
    print(sector)
    day_to_predict = 240

    stock_data = fetch_stock_data(stock_ticker, start_date, end_date)
    stock_data = add_target_column(stock_data,-day_to_predict)



    train_data, test_data = split_train_test_data(stock_data, test_days=90)
    print(test_data)
    print("_+_+_+_+__+_+_+_+_+_+")
    # print("Train Data Date Range:", train_data.index.min().date(), "to", train_data.index.max().date())
    # print("Test Data Date Range:", test_data.index.min().date(), "to", test_data.index.max().date())

    


    
    time_step = 20
    sc, features_scaled, target = reshape_training_data(train_data)
    # X_train, y_train = create_dataset(train_data_scaled,3, time_step)
    # print(features_scaled.shape)
    # print(target)
    # print(test_data['Close'])
    

    # X_test, y_test = create_dataset(test_data_scaled, 3,time_step)

    # Creating a data structure with 60 time-steps and 1 output
    
    
    model = create_model(features_scaled, target.values, 100, 32)

    features_test = test_data.iloc[:, :-1]
    test_data_scaled = sc.transform(features_test)

    predicted_stock_targets = model.predict(test_data_scaled)
    predicted_labels = predicted_stock_targets # Retrieve class with highest probability



    actual_labels = test_data['Target'].values

    mse = mean_squared_error(actual_labels, predicted_labels)
    print("Mean Squared Error (MSE):", mse)

    # Calculate R-squared (R^2)
    r2 = r2_score(actual_labels, predicted_labels)
    print("R-squared (R^2):", r2)

    print(predicted_labels)

    # classification_rep = classification_report(actual_labels, predicted_labels)
    # print("Classification Report:\n", classification_rep)

    # Plotting
    plt.plot(test_data.index, predicted_labels, color='red', label='Predicted Labels')
    plt.plot(test_data.index, test_data['Target'], color='green', label='Actual Labels')
    plt.title('Multi-Class Classification Predictions')
    plt.xlabel('Time')
    plt.ylabel('Label')
    plt.legend()
    plt.show()





if __name__ == "__main__":
    main()

