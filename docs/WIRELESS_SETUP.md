# Wireless Setup

This document is intended to provide information for facility configurations requiring wireless setup.

## Required Registers

Registers with suffixes lvtemp and avgtemp are used to hold temperature readings from their associated probe points.
These registers typically have a naming convention such as zoneXpYlvtemp or exhaustXavgtemp where X is the zone or blower id and the Y is the probe id.

## Required Tables

WIRELESS_POINT_FAILURES table in facility_configuration.lua
- This table is used for tracking data failures from wireless point ids. See example setup below.
> WIRELESS_POINT_FAILURES = {}
> WIRELESS_POINT_FAILURES["Zone01ProbeAPointID"] = 0
> WIRELESS_POINT_FAILURES["Zone01ProbeBPointID"] = 0


## Required Settings

ZoneXProbeYPointID settings in facility_configuration.lua and facility_config.js

- X is the zone id and Y is the probe id

ExhaustXProbePointID settings in facility_configuration.lua and facility_config.js

- X is the blower id and Y is the probe id

BiofilterXProbePointID settings in facility_configuration.lua and facility_config.js

- X is the blower id and Y is the probe id

*The above settings are used for holding the ID values for their respected probe points.*

WirelessBaseStationIP setting in facility_configuration.lua and facility_config.js
- Standard IP to use for WirelessBaseStationIP setting is 192.168.1.55
