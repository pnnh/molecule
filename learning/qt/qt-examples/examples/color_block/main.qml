import QtQuick 2.12
import QtQuick.Window 2.12

Window {
    visible: true
    width: 640
    height: 480
    title: qsTr("Hello World")

    Column {
        id: myColumn
        anchors.fill: parent
        spacing: 10

        Qml1 {
            //实例化另一个文件，文件名称第一个要大写
            id: qwe
        }

        Rectangle {
            width: 320
            height: 240
            color: "black"

            Text {
                id: txt
                text: "点击打开另一个窗口"
                color: "white"
                font.pixelSize: 20
                anchors.centerIn: parent
            }
            MouseArea {
                id: mouse_area
                anchors.fill: parent // 有效区域
                onClicked: {
                    qwe.show() //另一个qml文件显示
                }
            }
        }
        Qml2 {//实例化另一个文件
        }
    }
}
