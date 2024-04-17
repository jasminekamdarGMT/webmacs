# WebMACS

This repository contains the software for the x-600 based WebMACS control system. All contents are copyright 2019 Green Mountain Technologies.

---

## Description

The WebMACS software powers the WebMACS modular aeration control system for compost. There are two parts to the software, the control and datalogging program that runs on the control panel, and the user interface [(HMI)](#ui-/-hmi) that is loaded in the operator's web browser. The user interface is built with powerful, modern JavaScript libraries allowing it to provide real-time monitoring and control of the system. It is compatible with a wide range of desktop operating systems and browsers, as well as popular mobile devices.

### Features

**Responsive Web User Interface**

- The user interface [(HMI)](#ui-/-hmi) can adapt to various screen sizes, from desktops to smart phones
- Any computer or device connected to the same local network as the WebMACS controller can access the web UI
- Secure, remote access can be configured via the internet [*](#optional-features)
- The web UI provides an easy-to-read overview showing the current status of blowers, dampers, compost zones and more
- A settings page allows easy viewing and updating of process control parameters and system configuration variables
- The logs section allows viewing, downloading and removing of all batch files currently stored on the control panel

**Temperature Monitoring**

- Current compost temperatures can be viewed in real time
- Temperatures are logged automatically to a batch file
- Temperature records can be viewed in graph or table form
- Historical batch data can be downloaded for sharing and safekeeping
- Temperature graphs can be printed or downloaded as a PDF file
- Wired and wireless probe models are available
- Process air temperatures can also be monitored [*](#optional-features)

**Temperature Control**

- Average compost temperatures can be used to control blower and/or damper activity
- Temperature control uses a specialized PID algorithm tuned for compost processes
- Temperature set-points can be defined for each zone, blower, or regime [*](#optional-features)
- Current temperature setpoints are displayed in the user interface
- Reversing aeration can be controled with time and temperature settings [*](#optional-features)
- Misters can be used to control biofilter inflow air temperatures [*](#optional-features)

**Blower Control**

- Blowers can be controlled using variable frequency drives (VFD) or relays/starters
- Pressure sensors can be incorporated for VFD speed control [*](#optional-features)
- Current blower state, and related pressure values, etc can be viewed in real time
- An on/off time cycle can be defined for blowers
- It is possible to configure blowers for temperature control in damperless systems [*](#optional-features)
- Manual overrides can be used to force blower start/stop and bypass automatic speed controls

**Damper Control**

- Dampers may be incorporated for individual zone temperature control [*](#optional-features)
- Current damper position can be viewed in real time
- Manual overrides can be used to bypass automatic controls and force dampers to a desired position
- Damper position for a zone can be logged with the batch data

**Zone & Batch Controls**

- Each compost bay, vessel or pad is represented in the user interface as a zone
- Current temperatures, damper position, and setpoint can be viewed in real time
- Current batch age and control regime are displayed _(some systems do not used regimes)_
- Batches can be started, moved to a different zone, and ended
- Data for each batch is logged in a separate file on the controller in non-volatile memory
- Data for closed batches can be viewed on the logs page of the user interface

### General Specifications

These specifications are for a typical WebMACS system with a single web-enabled I/O controller module.

Specification               | Details
--------------------------- | -------
User Interface/HMI          | Powerful web-based HMI available on desktop and mobile devices
Control Enclosure           | NEMA 4 indoor/outdoor rated FRP enclosure
Controller Power Supply     | 24VDC UL rated power supply
Networking/Communications   | 10Mb/100Mb Ethernet switch in panel (optional router, WiFi or LTE modem)
I/O Capacity                | 1024 combined inputs and outputs per controller
Storage Capacity            | 1 GB of removable non-volatile storage (USB flash drive)
Batch File Capacity         | Approx. 1000 batches with up to 20,000 log entries each (over 1 year of data at 30 minute intervals per batch)
Batch File Format           | Comma-separated text (raw CSV data) and PDF (graph only)
Operating Temperature       | -40°F to 150°F
Temperature Probes          | Heavy duty stainless steel with one or two sensors (RTD or digital; wireless optional)

**Installation Requirements**

- 110VAC, 20A electrical supply
- Ethernet connection to local network or workstation/laptop
- Conduit and control wire and provided by customer
- Field wiring (terminations in control panel(s) and junction boxes) provided by GMT

### Compatible Operating Systems & Browsers

Most computers with a modern web browser can be used with WebMACS, as well as the majority of Apple and Android mobile devices. For best results we recommend one of the following:

- Windows 10 or newer, with the latest version of Edge, Chrome or Firefox installed
- Mac OSX 10.12 or newer, with the latest version of Safari, Chrome or Firefox installed
- Android devices with Android version 7 or newer
- iPhones and iPads with iOS version 10 or newer

Note that computers and devices without an Ethernet adapter may require a WiFi or remote access (both optional) to be configured for the system.

### Notes

##### UI / HMI

_Often with industrial control systems the user interface is referred to as the Human Machine Interface, or HMI._

##### Optional Features

_Some features may only be present on specific WebMACS systems depending on individual equipment and software configurations._

---

## Web UI Resources

We are currently using [Bootstrap 2.3][bootstrap-2.3] for it's small footprint and compatibility with older versions of jQuery. So far it seems to play well with the other libs being used on the x600. It also comes with a PNG based icon set that works within the x600 file type constraints (newer svg or font based icon files cannot be uploaded to the controller).

[bootstrap-2.3]: http://getbootstrap.com/2.3.2/

## Setting Up X300 Modules

Default IP is 192.168.1.2, or you can set with ARP:

```sh
sudo arp -s {new IP address} {serial number of X-300}
```

Change mode to Temperature Monitor (must be done within 60 seconds of activating safety interlock)

## Setting Up Local Dev Server

First, you will need node and npm installed. Then you can install the required npm packages:

```sh
npm install
```

You will need to run the backend in a separate terminal session to handle x600 proxy requests (example facility type: `single_direction` example facility name: `vision_recycling`):

```sh
node backend.js <facility_type>/<facility_name>
```

Then you can run the react dev server:

```sh
npm start
```

To run the react test suites:

```sh
npm test
```

## Current Build Process

First, create a build from the current source files:

```sh
npm run build
```

Then copy the `main...js`, `...chunck.js` and `/main...css` files from the `build/assets` dir to the facility's `custom_web_pages` dir. Update the references in the facility's `custom_web_pages/index.html` to match the new build files that were copied. Run the mock backend server and open `127.0.0.1:300/index.html` in your browser to check the build.

_Note: we are using React's **Code Splitting** feature to keep the javascript files below ~1MB. Fore some reason the x600 does not allow uploading files above this size._

## Loading Custom Web Pages to x600

The following files from this repository need to be uploaded the custom web pages section of the x600:

1. All files in the `public` folder (but not the files in `public/css` or `public/js`)

2. All files in the facility's `custom_web_pages` folder

_Note: If a file exists in both folders, use the one in `custom_web_pages`._

## Loading Lua Scripts to x600

The following files need to be copied onto the **Control / Logic > Scripts** section of the x600:

1. All files in the facility's `scripts` folder

## Running Lua Tests

There is a test suite for each set of lua scripts. To run the tests lua5.1 and luarocks must be installed. Then the required lua rocks must be installed:

```sh
luarocks install luaunit
luarocks install lua-cjson
luarocks install lsqlite3complete
luarocks install luasocket
```

The tests can be run for a specific facility like this:

```sh
lua facilities/<facility_type>/<facility_name>/tests/test.lua -v
```

The tests can be run for all facilities can be run like this:

```sh
for file in facilities/*/*/tests/test.lua;do lua "$file" -o text;done
```

## Lua Script Minification

For lua script minification, the npm package `luamin` needs to be installed:
```sh
npm install -g luamin
```

To minifiy a lua script, use the following command:

```sh
luamin -f filename_to_minify > minified_filename
```

For facilities with `release.sh` files, the `release.sh` shell script may be run to minify scripts. The minified files can be found in the `<facility_name>/minified_scripts` directory.

## Other Documentation

- [VFD Models](docs/VFD_MODELS.md)
- [Remote Access Tunnels](https://docs.google.com/spreadsheets/d/1Ep4JbHQ__BTFj1jWVWyHJISZXkp9jgPcZP5_hdCTJWY/edit#gid=0)
