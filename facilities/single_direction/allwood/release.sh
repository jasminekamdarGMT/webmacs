#!/bin/sh

FACILITY_TYPE="single_direction"
FACILITY_NAME="allwood"
CONTROL_SCRIPTS_DIR="x600m"

echo "Minifying lua control scripts for $FACILITY_NAME"

mkdir -p facilities/$FACILITY_TYPE/$FACILITY_NAME/minified_scripts

# Minify facility configuration script
luamin -f facilities/$FACILITY_TYPE/$FACILITY_NAME/scripts/facility_configuration.lua \
  > facilities/$FACILITY_TYPE/$FACILITY_NAME/minified_scripts/facility_configuration.lua

# Minify control scripts
luamin -f facilities/$FACILITY_TYPE/$CONTROL_SCRIPTS_DIR/scripts/blower_functions.lua \
  > facilities/$FACILITY_TYPE/$FACILITY_NAME/minified_scripts/blower_functions.lua
luamin -f facilities/$FACILITY_TYPE/$CONTROL_SCRIPTS_DIR/scripts/damper_functions.lua \
  > facilities/$FACILITY_TYPE/$FACILITY_NAME/minified_scripts/damper_functions.lua
luamin -f facilities/$FACILITY_TYPE/$CONTROL_SCRIPTS_DIR/scripts/data_functions.lua \
  > facilities/$FACILITY_TYPE/$FACILITY_NAME/minified_scripts/data_functions.lua
luamin -f facilities/$FACILITY_TYPE/$CONTROL_SCRIPTS_DIR/scripts/temp_functions.lua \
  > facilities/$FACILITY_TYPE/$FACILITY_NAME/minified_scripts/temp_functions.lua
