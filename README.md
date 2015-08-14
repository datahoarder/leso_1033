## datahoarder/leso_1033

LESO 1033 Program data comes from [DLA Disposition Services eReading Room ](http://www.dispositionservices.dla.mil/EFOIA-Privacy/Pages/ereadingroom.aspx#1033)


You can see a mirror of that page as captured on __August 12, 2015__ and rendered on [Github Pages](http://datahoarder.github.io/leso_1033/stash/mirror/dispositionservices.dla.mil-1033/ereadingroom.aspx.html)

Or visit it in the [stash folder in the git repo](stash/mirror/dispositionservices.dla.mil-1033/ereadingroom.aspx.html)


## PSC Data

Comes from the [Federal Procurement Data System](https://www.fpds.gov/wiki/index.php/PSC,_NAICS_and_more), which has a direct link to an Excel spreadsheet of PSC codes:

http://www.fpdsng.com/downloads/psc_data_Oct012015.xls




## Site mirrors

Since government sites can change, I've stashed mirrors for the relevant DoD and FPDS landing pages with links to copies of the data files, just in case you want to run my fetching [scripts and get the same results](scripts/fetch):

- [DoD LESO data](http://datahoarder.github.io/leso_1033/stash/mirror/dispositionservices.dla.mil-1033/ereadingroom.aspx.html)
- [FPDS](http://datahoarder.github.io/leso_1033/stash/mirror/fpds.gov-PSC/PSC,_NAICS_and_more.html)


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
wget --adjust-extension -HD www.fpdsng.com \
      --no-directories \
      --no-host-directories \
      --recursive --level=1 \
      --execute robots=off \
      --convert-links --backup-converted \
      --timestamping --page-requisites \
      --directory-prefix=fpds.gov-PSC \
      --user-agent="Mac OS X" \
      https://www.fpds.gov/wiki/index.php/PSC,_NAICS_and_more
~~~



Related stories:

- [The Pentagon Finally Details its Weapons-for-Cops Giveaway](https://www.themarshallproject.org/2014/12/03/the-pentagon-finally-details-its-weapons-for-cops-giveaway)
- [Muckrock FOIA: Program 1033 transfers nationwide 2000 to 2014 ](https://www.muckrock.com/foi/united-states-of-america-10/1033-transfers-nationwide-2000-to-2014-12969/)
