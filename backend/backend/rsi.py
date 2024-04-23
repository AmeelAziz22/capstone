import yfinance as yf
import pandas as pd       
import numpy as np

def calculate_rsi(ticker, window=14):
    data = yf.download(ticker, period='1y')
    delta = data['Close'].diff()
    gain = (delta.where(delta > 0, 0)).rolling(window=window).mean()
    loss = (-delta.where(delta < 0, 0)).rolling(window=window).mean()
    rs = gain / loss
    rsi = 100 - (100 / (1 + rs))
    data['RSI'] = rsi
    return rsi.iloc[-1]
  

def rsi_advice(rsi_value):
    if rsi_value >= 70:
        return "RSI is over 70, indicating the asset is overbought. Consider selling or taking profits."
    elif rsi_value <= 30:
        return "RSI is below 30, indicating the asset is oversold. Consider buying or accumulating positions."
    elif rsi_value > 50:
        return "RSI is above 50, suggesting bullish momentum. Consider holding or looking for buying opportunities."
    elif rsi_value < 50:
        return "RSI is below 50, suggesting bearish momentum. Consider holding or looking for selling opportunities."
    else:
        return "RSI is at 50, indicating a balanced market. Exercise caution and look for confirmation signals."

def calculate_macd(ticker, short_window=12, long_window=26, signal_window=9):
    # Fetch historical data
    data = yf.download(ticker, period='1y')

    # Calculate short-term exponential moving average (EMA)
    short_ema = data['Close'].ewm(span=short_window, adjust=False).mean()

    # Calculate long-term exponential moving average (EMA)
    long_ema = data['Close'].ewm(span=long_window, adjust=False).mean()

    # Calculate MACD line
    macd_line = short_ema - long_ema

    # Calculate signal line (9-day EMA of MACD line)
    signal_line = macd_line.ewm(span=signal_window, adjust=False).mean()

    # Calculate MACD histogram
    macd_histogram = macd_line - signal_line

    # Add MACD values to DataFrame
    data['MACD_Line'] = macd_line
    data['Signal_Line'] = signal_line
    data['MACD_Histogram'] = macd_histogram

    return data
  

def macd_advice(macd_data):
    last_macd = macd_data['MACD_Line'].iloc[-1]
    last_signal = macd_data['Signal_Line'].iloc[-1]
    last_histogram = macd_data['MACD_Histogram'].iloc[-1]
    
    if last_macd > last_signal and last_histogram > 0:
        return "Bullish signal: Consider buying or holding positions."
    elif last_macd < last_signal and last_histogram < 0:
        return "Bearish signal: Consider selling or staying out of the market."
    else:
        return "No clear signal: Exercise caution and wait for a clearer signal."

def calculate_volatility(ticker, window=252):
    data = yf.download(ticker, period='2y')
    returns = data['Close'].pct_change().dropna()
    volatility = returns.rolling(window=window).std() * (252 ** 0.5)  # Annualized volatility
    return volatility.iloc[-1]

def risk_level(volatility):
    if volatility > 0.2:
        return "High Risk"
    elif volatility > 0.1:
        return "Medium Risk"
    else:
        return "Low Risk"
    
def calculate_portfolio_volatility(tickers, shares, window=252):
    # Calculate the volatility of each stock
    stock_volatilities = [calculate_volatility(ticker, window) for ticker in tickers]
    
    # Convert shares to numpy array
    shares_array = np.array(shares)
    
    # Calculate the weights of each stock in the portfolio
    weights = shares_array / np.sum(shares_array)
    
    # Calculate the contribution of each stock to portfolio volatility
    stock_contributions = np.sqrt(weights) * np.array(stock_volatilities)
    
    # Calculate portfolio volatility
    portfolio_volatility = np.sqrt(np.sum(stock_contributions ** 2))
    
    return portfolio_volatility

# def get_pe_ratio(ticker):
#     # Fetch company information
#     income_statement = yf.Ticker(ticker).financials

#     print(income_statement.columns)

#     # Get the latest trailing twelve months (TTM) net income
#     net_income = income_statement['Net Income'].iloc[-1]

#     # Fetch historical data for the stock price
#     stock_data = yf.download(ticker, period='1d')

#     # Get the latest closing price
#     current_price = stock_data['Close'].iloc[-1]

#     # Calculate the trailing twelve months (TTM) earnings per share (EPS)
#     ttm_eps = net_income / len(stock_data)

#     # Calculate the price-to-earnings (P/E) ratio
#     pe_ratio = current_price / ttm_eps

#     return pe_ratio

def main():
  print(calculate_rsi('AAPL'))
  print(rsi_advice(calculate_rsi('AAPL')))
  print(calculate_macd('AAPL'))
  print(macd_advice(calculate_macd('AAPL')))
  print(calculate_volatility('AAPL'))
  print(risk_level(calculate_volatility('AAPL')))
  tickers = ['AAPL', 'GOOGL', 'MSFT']  # List of stock tickers
  shares = [100, 200, 150]
  print(calculate_portfolio_volatility(tickers,shares))
  print(get_pe_ratio('AAPL'))
  

if __name__ == "__main__":
    main()
