# Batch Moving Setup

This document is intended to provide a checklist to add the batch moving feature to facilities.


## Checklist

1. Register ```zoneXmoveto``` is required for each zone. Ex. (```zone01moveto```, ```zone02moveto```)

2. Update mock ```state.json``` to include ```zoneXmoveto``` registers

3. Update ```README.md``` to include ```zoneXmoveto``` documentation

4. Update ```batch_files.json``` to include title for each batch file. Ex. ```{"id": 1, "name": "/usb/06_21_2017_zone01.csv", "title": "originalbatch01"}```

5. In [custom_web_pages/faciity-config], ```layoutType: 'card'``` must be added to facilityConfig

6. In ```custom_web_pages/faciity-config.js```, ensure ```groupBlower``` contains ```blowerLabel``` with appropriate label

7. Add test for batch moving feature
