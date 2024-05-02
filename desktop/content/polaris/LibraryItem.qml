import QtQuick 2.15
import QtQuick.Controls 2.5
import QtQuick.Layouts 1.3

Rectangle {
    color: "#ffffff"
    Layout.preferredWidth: parent.width
    Layout.preferredHeight: 32
    Layout.alignment: Qt.AlignTop

    required property string library
    signal currentLibraryChanged(string currentLibrary)

    MouseArea {
        anchors.fill: parent
        onClicked: () => currentLibraryChanged(library)
        hoverEnabled: true
        onEntered: parent.color = "#e0e0e0"
        onExited: parent.color = "#ffffff"
    }

    Rectangle {
        width: parent.width - 16
        height: parent.height
        anchors.centerIn: parent
        color: "transparent"
        Text {
            anchors.verticalCenter: parent.verticalCenter
            text: library
        }
    }
}
