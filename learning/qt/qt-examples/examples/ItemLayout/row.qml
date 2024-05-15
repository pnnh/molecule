import QtQuick 2.9
import QtQuick.Controls 2.0
import QtQuick.Window 2.9
import Qt.labs.platform 1.0

Window {
    objectName: "rootObject"
    width: 640
    height: 480
    visible: true

    function setText(text) {
        centerText.text = text
    }

    Column {

        Text {
            id: centerText
            text: "A Single Text."
            font.pixelSize: 24
            font.bold: true
        }
        Row {
            anchors.topMargin: 8
            Button {
                anchors.rightMargin: 4
                anchors.bottomMargin: 4
                text: "A"
                onClicked: setText("A")
            }
            Button {
                anchors.rightMargin: 4
                anchors.bottomMargin: 4
                text: "B"
                onClicked: setText("B")
            }
            Button {
                anchors.rightMargin: 4
                anchors.bottomMargin: 4
                text: "C"
                onClicked: setText("C")
            }
            Button {
                anchors.rightMargin: 4
                anchors.bottomMargin: 4
                text: "D"
                onClicked: setText("D")
            }
        }
        Row {
            Button {
                anchors.rightMargin: 4
                anchors.bottomMargin: 4
                text: "E"
                onClicked: setText("E")
            }
            Button {
                anchors.rightMargin: 4
                anchors.bottomMargin: 4
                text: "F"
                onClicked: setText("F")
            }
            Button {
                anchors.rightMargin: 4
                anchors.bottomMargin: 4
                text: "G"
                onClicked: setText("G")
            }
            Button {
                anchors.rightMargin: 4
                anchors.bottomMargin: 4
                text: "H"
                onClicked: setText("H")
            }
        }
    }
}
