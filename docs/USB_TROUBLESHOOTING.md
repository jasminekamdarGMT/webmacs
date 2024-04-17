# USB Drive Troubleshooting

This document is intended to contain useful information and important procedures for handling USB issues.

## Number of files limits

- USB drives formatted as FAT16 can contain approximately 130-150 files
- USB drives formatted as FAT32 can contain approximately 230-250 files

## USB stuck in read-only mode

1. Power down the x600

2. Remove the USB drive from the x600

3. Insert the USB drive into a PC

4. Try to view the properties of the USB drive through the OS to check if the USB is in read-only mode

5. If the USB shows in read-only mode, uncheck or disable read-only mode and try to set the USB back to a read/write mode

6. While the USB is still inserted in a PC, try to create new files and copy files to the USB to verify the USB can have files written to it. If files cannot be written to the USB, there is likely to be an issue with the drive in which it is starting to fail. If files can be written to the USB, use the appropriate OS process to safely remove the USB from the PC.

7. After verifying that files can be written to the USB drive, re-insert the USB into the x600.

8. Power up the x600 and check if a batch file is created when starting a new batch.

## Copy batch log files to a replacement USB drive

1. Power down the x600

2. Remove the USB drive from the x600

3. Insert the USB drive into a PC

4. Copy the batch log files from the USB to the PC

5. Insert the replacement USB and copy the batch log files from the PC to the replacement USB

6. Use the appropriate OS process to safely remove the USB from the PC

7. Insert the replacement USB into the x600

8. Power up the x600 and check if a batch file is created when starting a new batch.
