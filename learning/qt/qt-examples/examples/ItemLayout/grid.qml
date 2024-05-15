import QtQuick 2.9
import QtQuick.Controls 2.0
import QtQuick.Window 2.9

Window {
    objectName: "rootObject"
    width: 640
    height: 480
    visible: true

    Grid {
        anchors.left: parent.left;
        anchors.leftMargin: 4;
        anchors.top: parent.top;
        anchors.topMargin: 4;
        rows: 3;
        columns: 3;
        rowSpacing: 4;
        columnSpacing: 4;

        Button {
            anchors.rightMargin: 4
            anchors.bottomMargin: 4
            text: "A"
            onClicked: setText("A")
        }
        Button {
            anchors.rightMargin: 4
            anchors.bottomMargin: 4
            text: "A"
            onClicked: setText("A")
        }
        Button {
            anchors.rightMargin: 4
            anchors.bottomMargin: 4
            text: "A"
            onClicked: setText("A")
        }
        Button {
            anchors.rightMargin: 4
            anchors.bottomMargin: 4
            text: "A"
            onClicked: setText("A")
        }
        Button {
            anchors.rightMargin: 4
            anchors.bottomMargin: 4
            text: "A"
            onClicked: setText("A")
        }
        Button {
            anchors.rightMargin: 4
            anchors.bottomMargin: 4
            text: "A"
            onClicked: setText("A")
        }
        Button {
            anchors.rightMargin: 4
            anchors.bottomMargin: 4
            text: "A"
            onClicked: setText("A")
        }
        Button {
            anchors.rightMargin: 4
            anchors.bottomMargin: 4
            text: "A"
            onClicked: setText("A")
        }
    }
}
