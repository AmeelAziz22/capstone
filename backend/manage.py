#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys
# import schedule
# import time
#
# def job(t):
#     print("I'm working...", t)
#     return
#
# schedule.every().day.at("15:14").do(job,'It is 01:00')
#
# while True:
#     schedule.run_pending()
#     time.sleep(1) # wait one minute


def main():
    """Run administrative tasks."""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    main()
