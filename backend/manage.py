#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys
import multiprocessing
from backend import daily as d

def start_server():
    """Start Django server."""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
    try:
        from django.core.management import execute_from_command_line
        execute_from_command_line(['manage.py', 'runserver'])
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc

def main():
    """Run administrative tasks."""
    # Create a multiprocessing Process for running the server
    server_process = multiprocessing.Process(target=start_server)
    server_process.start()

    # Call daily's main function
    d.main()

if __name__ == '__main__':
    main()
