## datahoarder/leso_1033

LESO 1033 Program data comes from [DLA Disposition Services eReading Room ](http://www.dispositionservices.dla.mil/EFOIA-Privacy/Pages/ereadingroom.aspx#1033)


You can see a mirror of that page as captured on __August 12, 2015__ and rendered on Github pages:

[datahoarder.github.io/stash/mirror/EFOIA-Privacy/Pages/ereadingroom.aspx.html
](datahoarder.github.io/stash/mirror/EFOIA-Privacy/Pages/ereadingroom.aspx.html)

Or visit it in the [stash folder in the git repo](stash/mirror/EFOIA-Privacy/Pages/ereadingroom.aspx.html)


The __wget__ command that I used to do the mirror:

~~~sh
wget --adjust-extension --span-hosts\
      --no-host-directories \
      --recursive --level=1 \
      --execute robots=off \
      --convert-links --backup-converted \
      --timestamping --page-requisites \
      --directory-prefix=dispositionservices.dla.mil-1033 \
      --user-agent="Mac OS X" \
      http://www.dispositionservices.dla.mil/EFOIA-Privacy/Pages/ereadingroom.aspx
~~~


Related stories:

- [The Pentagon Finally Details its Weapons-for-Cops Giveaway](https://www.themarshallproject.org/2014/12/03/the-pentagon-finally-details-its-weapons-for-cops-giveaway)
- [Muckrock FOIA: Program 1033 transfers nationwide 2000 to 2014 ](https://www.muckrock.com/foi/united-states-of-america-10/1033-transfers-nationwide-2000-to-2014-12969/)
