import QtQuick
import QtQuick.Controls
import QtQuick.Layouts

ColumnLayout {
    Layout.fillHeight: true
    Layout.fillWidth: true

    RowLayout {
        height: 40
        Text {
            text: "Hello中文😯"
            font.pointSize: 20
        }
    }
    RowLayout {
        Layout.preferredHeight: 80
        TextEdit {
            text: "Please Input 请输入内容"
            selectByMouse: true
            font.pointSize: 20
        }
    }
}

/*##^##
Designer {
    D{i:0;autoSize:true;formeditorZoom:0.75;height:480;width:640}D{i:2}D{i:1}D{i:4}D{i:3}
}
##^##*/

