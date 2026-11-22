MORF-X for Linux
================

1. Let MORF-X reach the unit over USB (once):

     sudo cp 99-morf-x.rules /etc/udev/rules.d/
     sudo udevadm control --reload && sudo udevadm trigger

   Then unplug the POD Go / Helix / HX unit and plug it in again.

2. Run it:

     ./MORF-X

   If it doesn't start on your distribution, try:  ./MORF-X --no-sandbox

Only one program can talk to the unit at a time: close HX Edit / POD Go Edit (if you run them under Wine) and
any browser tab using MORF-X first.

Not yet tried on a real Linux machine: please report how it goes at https://github.com/tavishrox/morf-x/issues
