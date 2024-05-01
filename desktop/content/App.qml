import QtQuick 2.15
import QtQuick.Controls 2.5
import QtQuick.Layouts 1.3
import "polaris"

Rectangle {
    anchors.fill: parent
    anchors.top: parent.top
    color: "#f8f8f8"
    radius: 8
    opacity: 1

    ColumnLayout {
        anchors.fill: parent
        anchors.top: parent.top
        spacing: 0
        Rectangle {
            height: 1
            Layout.preferredWidth: parent.width
            color: "#e2e2e2"
        }
        Rectangle {
            Layout.fillWidth: true
            Layout.fillHeight: true
            color: "transparent"

            RowLayout {
                height: parent.height
                width: parent.width
                spacing: 0
                Rectangle {
                    Layout.preferredHeight: parent.height
                    color: "transparent"
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
                                source: "qrc:/qt/qml/quick/assets/images/files.svg"
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
                    color: "transparent"
                }
                Rectangle {
                    Layout.alignment: Qt.AlignHLeft
                    Layout.preferredHeight: parent.height
                    width: 1
                    color: "#e2e2e2"
                }
                Rectangle {
                    Layout.fillWidth: true
                    Layout.fillHeight: true
                    color: "#FFFFFF"

                    RowLayout {
                        height: parent.height
                        width: parent.width
                        spacing: 0

                        Rectangle {
                            Layout.fillHeight: true
                            Layout.preferredWidth: parent.width / 2 - 0.5
                            color: "#FFFFFF"
                            Text {
                                text: qsTr("Hello Designw222")
                                color: "green"
                                anchors.centerIn: parent
                                font.family: Constants.font.family
                            }
                        }
                        Rectangle {
                            Layout.preferredHeight: parent.height
                            Layout.preferredWidth: 1
                            color: "#e2e2e2"
                        }

                        Editor{

                        }
                    }
                }
            }
        }


    }
}

