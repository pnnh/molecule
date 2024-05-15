import QtQuick 2.9
import QtQuick.Controls 2.0
import QtQuick.Window 2.9

Window {
    objectName: "rootObject";
    width: 360;
    height: 360;
    visible: true;
    Text {
        objectName: "textLabel";
        text: "Hello World";
        anchors.centerIn: parent;
        font.pixelSize: 26;
    }
    Button {
        anchors.right: parent.right;
        anchors.rightMargin: 4;
        anchors.bottom: parent.bottom;
        anchors.bottomMargin: 4;
        text: "quit";
        objectName: "quitButton";
    }
}
