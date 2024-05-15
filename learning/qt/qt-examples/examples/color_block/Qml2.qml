import QtQuick 2.0

Rectangle {
    width: 100
    height: width
    radius: width / 2
    color: "green"

    Text {
        id: txt
        text: "第2个文件"
        font.pixelSize: 20
        anchors.centerIn: parent
    }
}
