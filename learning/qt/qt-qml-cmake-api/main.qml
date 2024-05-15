import QtQuick
import mylib

Window {
    id: root
    visible: true
    Text {
        text: "Hello, world!"
        anchors.centerIn: parent
        color: "#000"
        z: 2
    }
    FramedImage { anchors.fill: parent }
    MyType{
        answer: 39
    }
}
