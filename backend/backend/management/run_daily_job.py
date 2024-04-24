# backend/management/commands/run_daily_job.py
from django.core.management.base import BaseCommand
from backend import daily as d


class Command(BaseCommand):
    help = 'Runs the daily job'

    def handle(self, *args, **options):
        print("Running daily job")
        d.main()