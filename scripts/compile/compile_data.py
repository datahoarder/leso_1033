"""

run:
    $ python3 -m scripts.compile.compile_data
"""
from scripts.settings import setup_space
from scripts.settings import FETCHED_DIR, COMPILED_DATA_PATH
from os.path import join
from xlrd import open_workbook, xldate_as_tuple
from datetime import datetime
from glob import glob
import csv

if __name__ == '__main__':
    setup_space()
    cwriter = csv.writer(open(COMPILED_DATA_PATH, 'w'))
    for fx, fname in enumerate(glob(join(FETCHED_DIR, '*.xls'))):
        # fx simply counts which Workbook we're on
        print("Opening", fname)
        wb = open_workbook(fname)
        if fx == 0:
        # if we're on the first workbook, add headers to the csv.writer
            cwriter.writerow(wb.sheet_by_index(0).row_values(0))
        for sheet in wb.sheets():
            # f*king excel...http://stackoverflow.com/a/1108474/160863
            wbdatemode = wb.datemode
            # skip the first row (headers) of every sheet
            for i in range(1, sheet.nrows):
                vals = sheet.row_values(i)
                # again, f*king excel...http://stackoverflow.com/a/1108474/160863
                dateval = datetime(*xldate_as_tuple(vals[-1], datemode = wbdatemode))
                vals[-1] = dateval.strftime("%Y-%m-%d")
                cwriter.writerow(vals)

