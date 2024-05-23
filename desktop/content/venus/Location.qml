import QtQuick 2.15
import QtQuick.Controls 2.5
import QtQuick.Layouts 1.3
import quick 1.0

Rectangle {
    anchors.fill: parent

    signal picturePathChanged(string path)

    Rectangle {
        id: favoritesArea
        width: parent.width
        height: 200

        Rectangle {
            height: 32
            width: parent.width

            Row {
                height: parent.height
                Rectangle {
                    width: 8
                    height: parent.height
                }

                Text{
                    text: "收藏"
                    color: "gray"
                    anchors.verticalCenter: parent.verticalCenter
                }
            }

        }
        Text{
            text: "收藏区域"
            anchors.centerIn: parent
        }
    }

    Rectangle {
        width: parent.width
        height: parent.height - favoritesArea.height
        anchors.top: favoritesArea.bottom

        Rectangle {
            height: 32
            anchors.top: parent.top
            anchors.left: parent.left
            anchors.right: parent.right

            Row {
                height: parent.height
                Rectangle {
                    width: 8
                    height: parent.height
                }

                Text{
                    text: "位置"
                    color: "gray"
                    anchors.verticalCenter: parent.verticalCenter
                }
            }
        }

        ListView {
            anchors.left: parent.left
            anchors.right: parent.right
            height: parent.height - 32
            anchors.top: parent.top + 32
            y:32
            boundsBehavior: Flickable.StopAtBounds
            model: PictureLocationViewModel {
            }
            delegate: Rectangle {
                width: 240
                height: 40
                color: "#ffffff"

                MouseArea {
                    anchors.fill: parent
                    hoverEnabled: true
                    onEntered: parent.color = "#e0e0e0"
                    onExited: parent.color = "#ffffff"
                    onClicked: {
                        picturePathChanged(path)
                    }
                }

                Rectangle {
                    width: parent.width - 16
                    height: parent.height
                    anchors.centerIn: parent
                    color: "transparent"
                    Text {
                        anchors.verticalCenter: parent.verticalCenter
                        text: title
                    }
                }
            }

        }
    }

}
