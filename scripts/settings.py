import os

DATA_DIR = "./stash/"
FETCHED_DIR = os.path.join(DATA_DIR, "fetched")
FETCHED_LESO_DIR = os.path.join(FETCHED_DIR, 'leso')
FETCHED_PSC_PATH = os.path.join(FETCHED_DIR, "pscdata.xls")
COMPILED_DIR = os.path.join(DATA_DIR, "compiled")
COMPILED_DATA_PATH = os.path.join(COMPILED_DIR, "leso-1033.csv")

def setup_space():
    os.makedirs(FETCHED_LESO_DIR, exist_ok = True)
    os.makedirs(COMPILED_DIR, exist_ok = True)
