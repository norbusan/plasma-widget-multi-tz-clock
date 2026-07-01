#!/bin/sh
# Install or upgrade the World Clock plasmoid into the current user's Plasma.
set -e
DIR="$(cd "$(dirname "$0")" && pwd)/package"
ID="org.kde.plasma.multitzclock"

if kpackagetool6 --type Plasma/Applet --list 2>/dev/null | grep -q "^${ID}$"; then
    kpackagetool6 --type Plasma/Applet --upgrade "$DIR"
else
    kpackagetool6 --type Plasma/Applet --install "$DIR"
fi

echo "Installed. Add it via 'Add Widgets…' (search for 'World Clock')."
echo "If it was already on screen, restart plasmashell to pick up changes:"
echo "    kquitapp6 plasmashell && kstart plasmashell"
