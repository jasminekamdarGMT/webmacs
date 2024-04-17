# Module Setup

This document is intended to contain useful information and important procedures for setting up Xytronix modules.

## X600 Module Setup

1. Connect power (make sure power supply matches module input range...some modules will be damaged if connected to 24 volt supply)

2. Connect ethernet (x600 will obtain DHCP address)

3. Power up and open `setup.html` in browser

4. Change network settings to desired IP address (requires reboot after updating setting)

5. Register IO modules (see Other Module Setup)

6. Add IO and registers

7. Add lua control scripts

8. Add custom web pages

## Other Module Setup

1. Connect power (make sure power supply matches module input range...some modules will be damaged if connected to 24 volt supply)

2. Connect ethernet (web io modules will default to 192.168.1.2)

3. Power up and open `setup.html` in browser

4. Change network settings to desired IP address (requires reboot after updating setting)

5. Reconnect on new IP address and make any necessary IO configuration changes

6. Register IO module with X600 devices list

7. Record module mac address or serial number in facility module readme