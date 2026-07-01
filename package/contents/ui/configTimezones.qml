/*
 * SPDX-License-Identifier: GPL-3.0-or-later
 */
import QtQuick
import QtQuick.Controls as QQC2
import QtQuick.Layouts
import org.kde.kcmutils as KCM
import org.kde.kirigami as Kirigami
import "timezones.js" as TZ

KCM.SimpleKCM {
    id: page

    // Bound two-way to the "timeZones" KConfigXT StringList entry. The dialog
    // hands us a JS array; reassigning it (never mutating in place) is what
    // marks the setting dirty so it gets saved.
    property var cfg_timeZones: []
    property var cfg_timeZonesDefault: ["Local", "America/New_York", "Europe/London", "Asia/Tokyo"]

    function move(from, to) {
        if (to < 0 || to >= cfg_timeZones.length)
            return;
        var arr = cfg_timeZones.slice();
        var item = arr.splice(from, 1)[0];
        arr.splice(to, 0, item);
        cfg_timeZones = arr;
    }

    function remove(index) {
        var arr = cfg_timeZones.slice();
        arr.splice(index, 1);
        cfg_timeZones = arr;
    }

    function add(id) {
        if (!id || cfg_timeZones.indexOf(id) !== -1)
            return;
        var arr = cfg_timeZones.slice();
        arr.push(id);
        cfg_timeZones = arr;
    }

    // Size to the available width but keep the natural (implicit) height so the
    // SimpleKCM scroll view can lay the content out instead of collapsing it.
    ColumnLayout {
        anchors.left: parent.left
        anchors.right: parent.right
        spacing: Kirigami.Units.smallSpacing

        QQC2.Label {
            Layout.fillWidth: true
            text: i18n("Time zones shown in the widget, from top to bottom:")
            wrapMode: Text.WordWrap
        }

        Repeater {
            model: page.cfg_timeZones

            delegate: Kirigami.AbstractCard {
                required property string modelData
                required property int index

                Layout.fillWidth: true

                contentItem: RowLayout {
                    spacing: Kirigami.Units.smallSpacing

                    QQC2.Label {
                        Layout.fillWidth: true
                        text: TZ.label(modelData)
                        elide: Text.ElideRight
                    }
                    QQC2.ToolButton {
                        icon.name: "go-up"
                        enabled: index > 0
                        display: QQC2.AbstractButton.IconOnly
                        text: i18n("Move up")
                        QQC2.ToolTip.text: text
                        QQC2.ToolTip.visible: hovered
                        onClicked: page.move(index, index - 1)
                    }
                    QQC2.ToolButton {
                        icon.name: "go-down"
                        enabled: index < page.cfg_timeZones.length - 1
                        display: QQC2.AbstractButton.IconOnly
                        text: i18n("Move down")
                        QQC2.ToolTip.text: text
                        QQC2.ToolTip.visible: hovered
                        onClicked: page.move(index, index + 1)
                    }
                    QQC2.ToolButton {
                        icon.name: "list-remove"
                        display: QQC2.AbstractButton.IconOnly
                        text: i18n("Remove")
                        QQC2.ToolTip.text: text
                        QQC2.ToolTip.visible: hovered
                        onClicked: page.remove(index)
                    }
                }
            }
        }

        QQC2.Label {
            Layout.fillWidth: true
            Layout.topMargin: Kirigami.Units.largeSpacing
            Layout.bottomMargin: Kirigami.Units.largeSpacing
            horizontalAlignment: Text.AlignHCenter
            visible: page.cfg_timeZones.length === 0
            opacity: 0.7
            text: i18n("No time zones yet. Add one below.")
        }

        Kirigami.Separator {
            Layout.fillWidth: true
            Layout.topMargin: Kirigami.Units.smallSpacing
        }

        RowLayout {
            Layout.fillWidth: true
            spacing: Kirigami.Units.smallSpacing

            QQC2.ComboBox {
                id: picker
                Layout.fillWidth: true
                editable: true
                model: TZ.zones

                // Show friendly labels in the dropdown.
                delegate: QQC2.ItemDelegate {
                    width: picker.width
                    required property string modelData
                    text: TZ.label(modelData)
                    highlighted: picker.highlightedIndex === index
                }

                Keys.onReturnPressed: addButton.clicked()
            }

            QQC2.Button {
                id: addButton
                icon.name: "list-add"
                text: i18n("Add")
                onClicked: {
                    var id = picker.currentIndex >= 0 ? picker.model[picker.currentIndex]
                                                      : picker.editText.trim();
                    page.add(id);
                }
            }
        }
    }
}
