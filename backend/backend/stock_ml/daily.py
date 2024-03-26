from datetime import datetime, timedelta
from threading import Timer
import time
from backend.stock_ml import preprocess_data as ml

def job():
    ml.main()


def repeater():
    x=datetime.today()
    y = x.replace(day=x.day, hour=3, minute=0, second=0, microsecond=0) #+ timedelta(days=1)
    delta_t=y-x

    secs=delta_t.seconds+1
    print(secs)
    time.sleep(secs)
    job()

def main():
    while(True):
        repeater()

if __name__ == '__main__':
    main()