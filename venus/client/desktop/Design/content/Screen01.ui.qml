

/*
This is a UI file (.ui.qml) that is intended to be edited in Qt Design Studio only.
It is supposed to be strictly declarative and only uses a subset of QML. If you edit
this file manually, you might introduce QML code that is not supported by Qt Design Studio.
Check out https://doc.qt.io/qtcreator/creator-quick-ui-forms.html for details on .ui.qml files.
*/
import QtQuick 6.4
import QtQuick.Controls 6.4
import QtQuick.Layouts
import Design

Rectangle {
    width: Constants.width
    height: Constants.height

    color: "#FFFFFF"

    Rectangle {
        color: "#F1F1F0"
        width: 240
        height: parent.height
        ColumnLayout {
            width: parent.width
            //height: parent.height
            spacing: 0
            Rectangle {
                color: "#F1F1F0"
                Layout.alignment: Qt.AlignTop
                Layout.preferredWidth: parent.width
                Layout.preferredHeight: 32
                RowLayout {
                    width: parent.width
                    height: parent.height
                    Text {
                        Layout.leftMargin: 16
                        text: "图片目录"
                        font.pointSize: 10
                        color: "#878786"
                    }
                    Image {
                        Layout.preferredHeight: 12
                        Layout.preferredWidth: 12
                        Layout.alignment: Qt.AlignHCenter
                        source: "images/plus.svg"
                    }
                }
            }
            Rectangle {
                color: "#D3D3D1"
                Layout.alignment: Qt.AlignTop
                Layout.preferredWidth: parent.width
                Layout.preferredHeight: 32
                RowLayout {
                    width: parent.width
                    height: parent.height
                    Text {
                        Layout.leftMargin: 16
                        text: "所有图片"
                    }
                }
            }
        }
    }

    Rectangle {
        color: "#4B96DD"
        height: 40
        width: parent.width
        anchors.top: parent.top
        anchors.right: parent.right
    }

    Rectangle {
        x: 0
        y: 40
        color: "#F1EBEA"
        width: 40
        height: parent.height - 40

        RoundButton {
            x: 4
            y: 8
            width: 32
            height: 32
            text: "+"
        }
    }

    Rectangle {
        x: 48
        y: 48
        height: 48
        width: parent.width - 56
        anchors.left: parent.left + 48
        color: "#FFFFFF"
        radius: 4
    }

    Rectangle {
        id: folders
        x: 48
        y: 104
        height: parent.height - 112
        width: 240
        anchors.left: parent.left + 48
        color: "#FFFFFF"
        radius: 4
    }

    Rectangle {
        id: items
        x: 296
        y: 104
        height: parent.height - 112
        width: 280
        color: "#FFFFFF"
        radius: 4
    }

    Rectangle {
        id: details
        x: 584
        y: 104
        height: parent.height - 112
        width: 528
        color: "#FFFFFF"
        radius: 4
    }

    Rectangle {
        y: 104
        height: parent.height - 112
        width: 240
        anchors.right: parent.right
        anchors.rightMargin: 8
        color: "#FFFFFF"
        radius: 4
    }

    Text {
        text: qsTr("Hello Design")
        anchors.centerIn: parent
        font.family: Constants.font.family
    }
}
