import QtQuick 2.9
import QtQuick.Controls 2.0
import QtQuick.Window 2.9

Window {
    objectName: "rootObject"
    width: 640
    height: 480
    visible: true

    Flow {
        anchors.left: parent.left;
        anchors.leftMargin: 4;
        anchors.bottom: parent.bottom;
        anchors.bottomMargin: 4;
        width: 280;
        height: 130;
        spacing: 4;

        Button {
            width: 80;
            height: 20;
            text: "A"
        }
        Button {
            width: 100;
            height: 40;
            text: "A"
        }
        Button {
            text: "A"
        }
        Button {
            width: 80;
            height: 25;
            text: "A"
        }
        Button {
            width: 35;
            height: 35;
            text: "A"
        }
        Button {
            width: 20;
            height: 80;
            text: "A"
        }
        Button {
            text: "A"
        }
    }
}
