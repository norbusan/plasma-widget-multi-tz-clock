import QtQuick
import org.kde.plasma.configuration

ConfigModel {
    ConfigCategory {
        name: i18n("Appearance")
        icon: "preferences-desktop-color"
        source: "configGeneral.qml"
    }
    ConfigCategory {
        name: i18n("Time Zones")
        icon: "preferences-system-time"
        source: "configTimezones.qml"
    }
}
