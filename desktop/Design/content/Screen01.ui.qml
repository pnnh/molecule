

/*
This is a UI file (.ui.qml) that is intended to be edited in Qt Design Studio only.
It is supposed to be strictly declarative and only uses a subset of QML. If you edit
this file manually, you might introduce QML code that is not supported by Qt Design Studio.
Check out https://doc.qt.io/qtcreator/creator-quick-ui-forms.html for details on .ui.qml files.
*/
import QtQuick 6.4
import QtQuick.Controls 6.4
import Design
import QtQuick.Layouts

Rectangle {
    width: Constants.width
    height: Constants.height

    color: Constants.backgroundColor

    RowLayout {
        x: 0
        y: 40
        height: parent.height - 40
        width: parent.width
        spacing: 0
        Rectangle {
            Layout.preferredHeight: parent.height
            color: "#F8F8F8"
            width: 48
            Layout.alignment: Qt.AlignHLeft

            ColumnLayout {
                width: parent.width - 16
                height: parent.height - 16
                anchors.centerIn: parent

                Rectangle {
                    Layout.alignment: Qt.AlignTop | Qt.AlignCenter
                    width: 24
                    height: 24
                    Image {
                        anchors.fill: parent
                        source: "assets/images/files.svg"
                    }
                }
            }
        }
        Rectangle {
            Layout.alignment: Qt.AlignHLeft
            Layout.preferredHeight: parent.height
            width: 1
            color: "#e2e2e2"
        }

        Rectangle {
            width: 280
            Layout.preferredHeight: parent.height
            color: "#F8F8F8"
        }

        Rectangle {

            Layout.fillWidth: true
            Text {
                text: qsTr("Hello Design")
                anchors.centerIn: parent
                font.family: Constants.font.family
            }
        }
    }
}
