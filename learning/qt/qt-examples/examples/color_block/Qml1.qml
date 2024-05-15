import QtQuick 2.0
import QtQuick.Window 2.2

Window {
    width: 320; height: 240
    visible: false	//该窗口一开始默认隐藏的
    color: "lightblue"

    Text {
        id: txt
        text: "另一个窗口"
        font.pixelSize: 20
        anchors.centerIn: parent
    }
}
