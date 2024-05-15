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

        Component {
            id: colorComponent;
            Rectangle {
                id: colorPicker;
                width: 50;
                height: 30;
                signal colorPicked(color clr);
                property Item loader;
                border.width: focus ? 2 : 0;
                border.color: focus ? "#90D750" : "#808080";
                MouseArea {
                    anchors.fill: parent;
                    onClicked: {
                        colorPicker.colorPicked(colorPicker.color);
                        loader.focus = true;
                    }
                }
                Keys.onReturnPressed: {
                    colorPicker.colorPicked(colorPicker.color);
                    event.accepted = true;
                }
                Keys.onSpacePressed: {
                    colorPicker.colorPicked(colorPicker.color);
                    event.accepted = true;
                }
            }
        }

        Loader {
            id: redLoader;
            width: 80;
            height: 60;
            anchors.left: parent.left;
            anchors.leftMargin: 4;
            anchors.bottom: parent.bottom;
            anchors.bottomMargin: 4;
            sourceComponent: colorComponent;
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
            sourceComponent: colorComponent;
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
