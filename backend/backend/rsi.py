import yfinance as yf
import pandas as pd       


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

def main():
  print(calculate_rsi('AAPL'))
  print(rsi_advice(calculate_rsi('AAPL')))
  print(calculate_macd('AAPL'))
  print(macd_advice(calculate_macd('AAPL')))
  print(calculate_volatility('AAPL'))
  print(risk_level(calculate_volatility('AAPL')))
  

if __name__ == "__main__":
    main()
