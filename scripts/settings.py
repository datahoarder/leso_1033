import os

DATA_DIR = "./stash/"
FETCHED_DIR = os.path.join(DATA_DIR, "fetched")
COMPILED_DIR = os.path.join(DATA_DIR, "compiled")


def setup_space():
    os.makedirs(FETCHED_DIR, exist_ok = True)
    os.makedirs(COMPILED_DIR, exist_ok = True)
