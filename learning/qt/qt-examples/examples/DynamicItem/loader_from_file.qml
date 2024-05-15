import QtQuick 2.9
import QtQuick.Controls 2.0
import QtQuick.Window 2.9
import Qt.labs.platform 1.0

Window {
    objectName: "rootObject"
    width: 640
    height: 480
    visible: true

    Rectangle {
        width: 320;
        height:  240;
        color: "#C0C0C0";

        Text {
            id: coloredText;
            anchors.horizontalCenter: parent.horizontalCenter;
            anchors.top: parent.top;
            anchors.topMargin: 4;
            text: "Hello World!";
            font.pixelSize: 32;
        }

        Loader {
            id: redLoader;
            width: 80;
            height: 60;
            anchors.left: parent.left;
            anchors.leftMargin: 4;
            anchors.bottom: parent.bottom;
            anchors.bottomMargin: 4;
            source: "ColorPicker.qml"
            KeyNavigation.right: blueLoader;
            KeyNavigation.tab: blueLoader;
            onLoaded: {
                item.color = "red";
                item.focus = true;
                item.loader = redLoader;
            }
            onFocusChanged: {
                item.focus = focus;
            }
        }

        Loader {
            id: blueLoader;
            anchors.left: redLoader.right;
            anchors.leftMargin: 4;
            anchors.bottom: parent.bottom;
            anchors.bottomMargin: 4;
            source: "ColorPicker.qml"
            KeyNavigation.left: redLoader;
            KeyNavigation.right: redLoader;
            onLoaded: {
                item.color = "blue";
                item.loader = blueLoader;
            }
            onFocusChanged: {
                item.focus = focus;
            }
        }

        Connections {
            target: redLoader.item;
            onColorPicked: {
                coloredText.color = clr;
            }
        }
        Connections {
            target: blueLoader.item;
            onColorPicked: {
                coloredText.color = clr;
            }
        }
    }
}
