import yfinance as yf
import pandas as pd
import numpy as np

def fetch_stock_data(ticker, start_date, end_date):
    stock_data = yf.download(ticker, start=start_date, end=end_date)
    return stock_data

def main():
    stock_ticker = 'AAPL'
    start_date = '2010-01-01'
    end_date = '2022-01-01'

    stock_data = fetch_stock_data(stock_ticker, start_date, end_date)
    print(stock_data)

if __name__ == "__main__":
    main()
