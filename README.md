# Pentagon LESO 1033 Data
##### The records for what &ndash; and how much  &ndash; military equipment has been given to U.S. police

This repo contains a conveniently-packaged CSV file containing data from the Pentagon's military-gear-for-civilian-police program (a.k.a LESO 1033), as well as the Python 3 scripts for reproducing the process.

In response to some very persistent [Freedom of Information Act requests by investigative journalists](https://www.muckrock.com/news/archives/2014/dec/09/how-we-got-pentagon-reveal-what-gear-they-gave-cop/), the Pentagon [now posts the LESO 1033 records as Excel files](http://www.dispositionservices.dla.mil/EFOIA-Privacy/Pages/ereadingroom.aspx#1033). However, the data is split into many sheets. The code in this repo cleans and [cats](https://en.wikipedia.org/wiki/Cat_(Unix)) the data, and also joins it to the product codes from the federal procurement system.


## (╯°□°）╯ ┻THE━DATA┻ 

If you just want the data as a plaintext, comma-delimited file with nearly __195,000 rows__, you can download it from here:

[raw/master/stash/compiled/leso-1033.csv](https://github.com/datahoarder/leso_1033/raw/master/stash/compiled/leso-1033.csv)

### Caveats (ಠ_ಠ) 
I make __no guarantees__ for the accuracy of this dataset. I have not double-checked the numbers so it's up to you to confirm them. This repo contains the original files. And you can of course read and run the code and reproduce it yourself. 

I've [listed a number of data journalism stories and projects](#data-journalism) that you can cross-check...in fact, I highly recommend you read these stories to understand the origins of this dataset. Because like all datasets, is not all that it _seems_ to be. At the very least, remember to multiply the __Quantity__ column by the __Acquisition Value__ when calculating totals... 

### What does the data look like?

A sample row with headers:

|         Header         |                   Sample value                  |
|------------------------|-------------------------------------------------|
| __State__              | TN                                              |
| __Station Name (LEA)__ | SMITH COUNTY SHERIFF DEPT                       |
| __NSN__                | 2355-01-590-1660                                |
| __Item Name__          | MINE RESISTANT VEHICLE                          |
| __Quantity__           | 1                                               |
| __UI__                 | Each                                            |
| __Acquisition Value__  | 733000                                          |
| __DEMIL Code__         | C                                               |
| __DEMIL IC__           | 1                                               |
| __Ship Date__          | 2014-02-13                                         |
| __PSC NAME__           | COMBAT, ASSAULT, AND TACTICAL VEHICLES, WHEELED |


# Background


The U.S. Defense Department's [Law Enforcement Support Office (LESO) 1033 Program was originally established](http://www.dispositionservices.dla.mil/leso/pages/default.aspx) as a way to send unused surplus military gear to U.S. law enforcement agencies involved in the War on Drugs. The 1033 program was later expanded to any U.S. law enforcement agency, [though preference is given to requests related to counter-drug and counter-terrorism requests](http://www.dispositionservices.dla.mil/leso/pages/1033programfaqs.aspx).

The program has, of late, come under scrutiny because of photos of heavily-equipped police [during the civil unrest in Ferguson during 2014](http://en.wikipedia.org/wiki/2014_Ferguson_unrest). After persistent FOIA requests, [particularly by MuckRock](https://www.muckrock.com/news/archives/2014/dec/09/how-we-got-pentagon-reveal-what-gear-they-gave-cop/), the Pentagon released the records of what it has sent out and to which law enforcement agencies.

## Data Journalism

Here are some relevant news stories and projects:

- [MuckRock • How we got the Pentagon to reveal what gear they gave cops](https://www.muckrock.com/news/archives/2014/dec/09/how-we-got-pentagon-reveal-what-gear-they-gave-cop/) 
- [The Pentagon Finally Details its Weapons-for-Cops Giveaway](https://www.themarshallproject.org/2014/12/03/the-pentagon-finally-details-its-weapons-for-cops-giveaway)
- [Muckrock FOIA: Program 1033 transfers nationwide 2000 to 2014 ](https://www.muckrock.com/foi/united-states-of-america-10/1033-transfers-nationwide-2000-to-2014-12969/)
- [Central Florida police acquire military surplus gear (clickorlando.com)](http://www.clickorlando.com/news/central-florida-police-acquire-military-surplus-gear/27414316) - Just so that you're aware, not all helicopters are equal. You should read this excellent local story to see how this dataset has a lot of ambiguous details.
- [Mapping the Spread of the Military’s Surplus Gear - The New York Times](http://www.nytimes.com/interactive/2014/08/15/us/surplus-military-equipment-map.html?_r=1) 
- [MRAPs And Bayonets: What We Know About The Pentagon's 1033 Program : NPR (npr.org)](http://www.npr.org/2014/09/02/342494225/mraps-and-bayonets-what-we-know-about-the-pentagons-1033-program) 
- [A reusable data processing workflow - a guide by NPR Visuals on how it processed the 1033 data](http://blog.apps.npr.org/2014/09/02/reusable-data-processing.html) 
- In my public affairs data journalism class last year, [I made the 1033 data the subject of the midterm](http://www.padjo.org/2014-10-23/#midterm-information)

Note: In the stories (including my midterm) that happened before December 2014, the dataset used is _a previous iteration_ in which the Pentagon refused to disclose which law enforcement agencies were involved. So that version of the dataset only includes details of the state and county of the receiving agency. 

The dataset hosted in this repo has the __name of the agency and the state__.


## The LESO 1033 data

The LESO 1033 Program data comes from [DLA Disposition Services eReading Room ](http://www.dispositionservices.dla.mil/EFOIA-Privacy/Pages/ereadingroom.aspx#1033). (You can see a mirror of that page as captured on __August 12, 2015__ and rendered on [Github Pages](http://datahoarder.github.io/leso_1033/stash/mirror/dispositionservices.dla.mil-1033/ereadingroom.aspx.html))

The 1033 data is distributed as Excel spreadsheets, and contain a row for every line item distribution, e.g. what kind of equipment, how many of it, and to what agency. Included in the data is the __original acquisition cost__ of the item, which can be a (very) rough estimate of evaluating the amount of surplus distributed.


## Product Service Codes Data

Product Service Codes (PSC) are used by the Federal Procurement Data System to categorize the various products. [Acquisition.gov has a PDF manual](https://www.acquisition.gov/sites/default/files/page_file_uploads/PSC%20Manual%20-%20Final%20-%2011%20August%202011.pdf) with way more detail than you need (I've stashed a copy [here](stash/mirror/psc-manual-final-11-august-2011.pdf)). 

With PSC data, we can add some general categorization to the LESO data, which contains a __NSN__ (short for __National Supply Number__) and __Item Name__ column:

|       NSN        |         Item Name         |
|------------------|---------------------------|
| 1005-00-073-9421 | RIFLE,5.56 MILLIMETER     |
| 8415-01-546-8809 | JACKET,COLD WEATHER       |
| 1240-01-439-2730 | BINOCULAR                 |
| 8465-01-465-2057 | POUCH,RADIO,MOLLE         |
| 8465-01-515-8615 | FIELD PACK                |
| 1005-01-562-9455 | HOLDER,MULTIPLE MAGAZINE  |

The first 4 digits of the NSN correspond to a PSC. The [scripts/compile_data.py](scripts/compile_data.py) does the work of matching those NSN digits to the corresponding PSC:




|       NSN        |        Item Name         |                PSC NAME                |
|------------------|--------------------------|----------------------------------------|
| 1005-00-073-9421 | RIFLE,5.56 MILLIMETER    | GUNS, THROUGH 30MM                     |
| 8415-01-546-8809 | JACKET,COLD WEATHER      | CLOTHING, SPECIAL PURPOSE              |
| 1240-01-439-2730 | BINOCULAR                | OPTICAL SIGHTING AND RANGING EQUIPMENT |
| 8465-01-465-2057 | POUCH,RADIO,MOLLE        | INDIVIDUAL EQUIPMENT                   |
| 1005-01-562-9455 | HOLDER,MULTIPLE MAGAZINE | GUNS, THROUGH 30MM                     |

As you can see, you can't quite rely on __PSC NAME__ alone, as it defines certain firearm accessories in the same categories as firearms themselves.

The [FPDS has a wiki](https://www.fpds.gov/wiki/index.php/PSC,_NAICS_and_more) which has a direct link to an Excel spreadsheet of PSC data:

http://www.fpdsng.com/downloads/psc_data_Oct012015.xls


## The code

The programming scripts in this repo are written in Python 3.4.x and use a few third-party libraries, most notably [Requests](http://www.python-requests.org/en/latest/) and [xlrd (for Excel work)](https://pypi.python.org/pypi/xlrd). Setting up your programming environment can be quite complicated, so I won't offer detailed directions on that. But one relatively easy way to start is to use the [Anaconda distribution for __Python 3__](http://continuum.io/downloads#py34).

If you clone this repo:

~~~sh
$ git clone https://github.com/datahoarder/leso_1033.git
# change into the directory:
$ cd leso_1033
~~~

And then have the right dependencies and setup, you can run the two scripts needed to collect and clean the data:

~~~sh
$ python -m scripts.fetch.fetch_data
$ python -m scripts.compile.compile_data
~~~

Here's a brief description of what they do:

#### [scripts/fetch/fetch_data.py](scripts/fetch/fetch_data.py)

This script simply downloads the data files and stores them into the [stash/fetched](stash/fetched) directory.

#### [scripts/compile/compile_data.py](scripts/compile/compile_data.py)

This script uses the [xlrd](http://www.python-excel.org/) library to open each Excel file and extract the data. Each of the LESO Excel workbooks contain multiple spreadsheets, one for each state, and so this script does the menial work of joining those together.

This script also contains the logic that matches up the product categories from the PSC spreadsheet with each record in the LESO 1033 spreadsheets. 

When the script is finished reconciling and cleaning the data, it outputs a plain-text CSV: [stash/compiled/leso-1033.csv](stash/compiled/leso-1033.csv)


## Site mirrors

Since government sites can change, I've stashed mirrors for the relevant DoD and FPDS landing pages with links to copies of the data files, just in case you want to run my fetching [scripts and get the same results](scripts/fetch):

- [DoD LESO data](http://datahoarder.github.io/leso_1033/stash/mirror/dispositionservices.dla.mil-1033/ereadingroom.aspx.html)
- [FPDS](http://datahoarder.github.io/leso_1033/stash/mirror/fpds.gov-PSC/PSC%2C_NAICS_and_more.html)


The __wget__ command that I used to do the mirrors:

~~~sh
wget --adjust-extension\
      --no-directories \
      --no-host-directories \
      --recursive --level=1 \
      --execute robots=off \
      --convert-links --backup-converted \
      --timestamping --page-requisites \
      --directory-prefix=dispositionservices.dla.mil-1033 \
      --user-agent="Mac OS X" \
      http://www.dispositionservices.dla.mil/EFOIA-Privacy/Pages/ereadingroom.aspx
~~~


~~~sh
wget  --recursive \
      --level=1 \
      --span-hosts \
      --domains=www.fpdsng.com \
      --no-host-directories \
      --no-directories \
      --adjust-extension \
      --convert-links \
      --backup-converted \
      --execute robots=off \
      --page-requisites \
      --timestamping \
      --directory-prefix=fpds.gov-PSC \
      --user-agent="Mac OS X" \
      https://www.fpds.gov/wiki/index.php/PSC,_NAICS_and_more
~~~


