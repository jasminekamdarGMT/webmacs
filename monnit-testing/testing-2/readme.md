# Monnit Testing 2

Here are the goals of this test:

- Run all this code in a folder of a single version, which will include
  - this readme file
  - two Lua scripts, one for the modbus querying and another simple time delay that will run in parallell (to see if the modbus is slownig things down)
- Update the existing Lua code to:
  - Accept variables for # of sensors and how many registers per sensor, and loop appropriately through
  - Record time intervals for each step, so we can figure out what is taking so long
  - Accept a variable to turn the modbus function on and off
    - Also have a variable to turn the tcpClose() function on and off
- Once the code is running on the debug menu, could create a gui interaction to turn the modbus on and off to play with the timing
