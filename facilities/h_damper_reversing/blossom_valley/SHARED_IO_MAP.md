# Shared IO Map

## Analog Inputs
MCP-2 Device Name     | MCP-2 IO Name                | MCP-1 IO Name                  
--------------------- | ---------------------------- | -------------------------------
mcp02AnalogInput      | analog1                      | ductP6pospressure
mcp02AnalogInput      | analog2                      | ductP6negpressure
mcp02AnalogInput      | analog3                      | exhaustP6temp
mcp02AnalogInput      | analog4                      | premisterP6temp

## Digital Inputs
MCP-2 Device Name     | MCP-2 IO Name                | MCP-1 IO Name                  
--------------------- | ---------------------------- | -------------------------------
mcp02InputRelay2      | input1                       | blowerS3fault
mcp02InputRelay1      | input5                       | blowerP5fault
mcp02InputRelay1      | input6                       | blowerP6fault

## Relays
MCP-2 Device Name     | MCP-2 IO Name                | MCP-1 IO Name                  
--------------------- | ---------------------------- | -------------------------------
mcp02InputRelay2      | relay1                       | blowerS3run
mcp02InputRelay2      | relay3                       | ductP6mister
mcp02InputRelay2      | relay4                       | blowerP6revdamper
mcp02InputRelay1      | relay5                       | blowerP5run
mcp02InputRelay1      | relay6                       | blowerP6run
