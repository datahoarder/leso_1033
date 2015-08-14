"""
run:
    $ python3 -m scripts.compile.compile_data

Produces CSV in COMPILED_DATA_PATH
"""
from scripts.settings import setup_space
from scripts.settings import FETCHED_LESO_DIR, FETCHED_PSC_PATH, COMPILED_DATA_PATH
from os.path import join
from xlrd import open_workbook, xldate_as_tuple
from datetime import datetime
from collections import OrderedDict
from glob import glob
import csv


def gather_psc_dict():
    """
    Reads the PSC spreadsheet into a dict of dicts
     skips rows in which `END DATE` is NOT blank
    Returns: a dict of dicts, in which `PSC CODE` is used as the key
    """
    dicts = {}
    headers = None
    wb = open_workbook(FETCHED_PSC_PATH)
    # f*king excel...http://stackoverflow.com/a/1108474/160863
    # we need to get the datemode of the workbook to translate its dates
    wbdatemode = wb.datemode
    sheet = wb.sheets()[0] # there's only one sheet in this book

    for row in sheet.get_rows():
        vals = [col.value for col in row]
        if not headers:
            if vals[0] == '': # # first few rows are empty, so skip
                continue
            else:
                headers = vals
        else: # headers are set

            d = dict(zip(headers, vals))
            if not d['END DATE']: # if a row has an END DATE, then we don't want it
                # for whatever reason, some values have trailing spaces...
                d['PSC CODE'] = d['PSC CODE'].strip()
                # again, f*king excel...http://stackoverflow.com/a/1108474/160863
                dt = datetime(*xldate_as_tuple(d['START DATE'], datemode = wbdatemode))
                d['START DATE'] = dt.strftime('%Y-%m-%d')
                dicts[d['PSC CODE']] = d

    return dicts

# quick and dirty header grabber
def get_leso_headers():
    """
    Returns the headers for the LESO data as a list of strings
    """
    # just grab the first file's headers
    fname = glob(join(FETCHED_LESO_DIR, '*.xls'))[0]
    wb = open_workbook(fname)
    return wb.sheet_by_index(0).row_values(0)

def iterate_leso_data():
    """
    Compiles the LESO sheets and yields dicts
    One of its effects is to convert the Ship Date column into a proper date
    """
    headers = get_leso_headers()
    for fx, fname in enumerate(glob(join(FETCHED_LESO_DIR, '*.xls'))):
        # fx simply counts which Workbook we're on
        wb = open_workbook(fname)
        print("Reading from workbook:", fname)
        for sheet in wb.sheets():
            print("\t -", sheet.name)
            # f*king excel...http://stackoverflow.com/a/1108474/160863
            wbdatemode = wb.datemode
            # skip the first row (headers) of every sheet
            for i in range(1, sheet.nrows):
                vals = sheet.row_values(i)
                d = OrderedDict(zip(headers, vals))
                # again, f*king excel...http://stackoverflow.com/a/1108474/160863
                dateval = datetime(*xldate_as_tuple(d['Ship Date'], datemode = wbdatemode))
                d['Ship Date'] = dateval.strftime("%Y-%m-%d")
                yield d

def run():
    headers = get_leso_headers()
    headers.append('PSC NAME')
    print("Loading PSC data...")
    pscdict = gather_psc_dict()
    cwriter = csv.DictWriter(open(COMPILED_DATA_PATH, 'w'), fieldnames = headers)
    cwriter.writeheader()
    for i, row in enumerate(iterate_leso_data()):
        # get first four digits of NSN:
        ncode = row['NSN'].strip().split('-')[0]
        # some NSN-4-digits aren't in the PSC data for some WTF reason,
        # e.g. 7025 for computer stuff, e.g. 'KEYBOARD,DATA ENTRY'
        # So we truncate it to 7020 to get the broader category
        if not pscdict.get(ncode):
            ncode = ncode[0:3] + '0'
        try:
            row['PSC NAME'] = pscdict[ncode]['PRODUCT AND SERVICE CODE NAME']
        except Exception:
            print("Bad NSN code:", ncode)
            print(row)
            print("--------------------\n")
        else:
            cwriter.writerow(row)
    print("%s rows written to %s" % (i, COMPILED_DATA_PATH))


if __name__ == '__main__':
    setup_space()
    run()
