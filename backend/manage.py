#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys
import multiprocessing
from backend import daily as d
from django.core.management import execute_from_command_line


def start_server():
    """Run administrative tasks."""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
    try:
        # Check if the command is "runserver", then start the server
        if 'runserver' in sys.argv:
            execute_from_command_line(['manage.py', 'runserver'])
        else:
            execute_from_command_line(sys.argv)
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc

def main():
    """Run administrative tasks."""
    # Call daily's main function
    d.main()

if __name__ == '__main__':
    # Check if the argument is "runserver", then start the server
    if 'runserver' in sys.argv:
        start_server()
    else:
        main()
