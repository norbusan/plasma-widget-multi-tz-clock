#!/bin/sh
# Remove the World Clock plasmoid from the current user's Plasma.
set -e
kpackagetool6 --type Plasma/Applet --remove org.kde.plasma.multitzclock
echo "Removed org.kde.plasma.multitzclock."
