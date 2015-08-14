"""
run:
    $ python3 -m scripts.fetch.fetch_data
"""
from scripts.settings import setup_space
from scripts.settings import FETCHED_LESO_DIR, FETCHED_PSC_PATH
from os.path import join
from urllib.parse import urljoin
import requests

BASE_URL = 'http://www.dispositionservices.dla.mil/EFOIA-Privacy/Documents/LESO%20Data/'
PSC_DATA_URL = 'http://www.fpdsng.com/downloads/psc_data_Oct012015.xls'
# A mirror for August 2015 can be found here:
# BASE_URL = "http://datahoarder.github.io/leso_1033/stash/mirror/dispositionservices.dla.mil-1033/"
LESO_FILENAMES = [
    'Alaska_Louisiana.xls',
    'Massachussetts_Wyoming_Territories.xls'
]

if __name__ == '__main__':
    setup_space()
    for dname in LESO_FILENAMES:
        url = urljoin(BASE_URL, dname)
        print("Downloading LESO:", url)
        resp = requests.get(url)
        with open(join(FETCHED_LESO_DIR, dname), 'wb') as f:
            f.write(resp.content)
    # now download PSC data
    print("Downloading PSC", PSC_DATA_URL)
    resp = requests.get(PSC_DATA_URL)
    with open(FETCHED_PSC_PATH, 'wb') as f:
        f.write(resp.content)
