"""
run:
    $ python3 -m scripts.fetch.TEMPLATE
"""
from scripts.settings import setup_space
from scripts.settings import FETCHED_DIR
import os.path
import requests

if __name__ == '__main__':
    setup_space()
