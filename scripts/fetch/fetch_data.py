"""
run:
    $ python3 -m scripts.fetch.fetch_data
"""
from scripts.settings import setup_space
from scripts.settings import FETCHED_DIR
from os.path import join
from urllib.parse import urljoin
import requests

BASE_URL = 'http://www.dispositionservices.dla.mil/EFOIA-Privacy/Documents/LESO%20Data/'
# A mirror for August 2015 can be found here:
# BASE_URL = "http://datahoarder.github.io/leso_1033/stash/mirror/dispositionservices.dla.mil-1033/"
DATA_FILENAMES = [
    'Alaska_Louisiana.xls',
    'Massachussetts_Wyoming_Territories.xls'
]

if __name__ == '__main__':
    setup_space()
    for dname in DATA_FILENAMES:
        url = urljoin(BASE_URL, dname)
        fname = join(FETCHED_DIR, dname)
        print("Downloading", url)
        resp = requests.get(url)
        with open(fname, 'wb') as f:
            f.write(resp.content)
