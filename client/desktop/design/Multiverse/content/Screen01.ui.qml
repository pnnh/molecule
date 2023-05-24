

/*
This is a UI file (.ui.qml) that is intended to be edited in Qt Design Studio only.
It is supposed to be strictly declarative and only uses a subset of QML. If you edit
this file manually, you might introduce QML code that is not supported by Qt Design Studio.
Check out https://doc.qt.io/qtcreator/creator-quick-ui-forms.html for details on .ui.qml files.
*/
import QtQuick 6.4
import QtQuick.Controls 6.4
import QtQuick.Layouts 1.3
import Multiverse

Rectangle {
    width: Constants.width
    height: Constants.height

    color: Constants.backgroundColor

    ColumnLayout {
        anchors.fill: parent
        spacing: 0
        Rectangle {
            Layout.preferredWidth: parent.width
            height: 36
            Layout.alignment: Qt.AlignTop
            color: "green"
            Text {
                text: "主标题栏"
                anchors.centerIn: parent
            }
        }
        Rectangle {
            Layout.preferredWidth: parent.width
            height: 36
            Layout.alignment: Qt.AlignTop
            color: "yellow"
            Text {
                text: "主工具栏"
                anchors.centerIn: parent
            }
        }
        Rectangle {
            Layout.fillHeight: true
            Layout.fillWidth: true
            Layout.alignment: Qt.AlignTop
            RowLayout {
                anchors.fill: parent
                Rectangle {
                    Layout.preferredWidth: 240
                    Layout.fillHeight: true

                    ColumnLayout {
                        //anchors.fill: parent
                        width: parent.width
                        spacing: 0
                        Rectangle {
                            color: "green"
                            Layout.preferredWidth: parent.width
                            //Layout.preferredHeight: 24
                            height: 24
                            Layout.alignment: Qt.AlignTop

                            Text {
                                leftPadding: 8
                                text: qsTr("主目录")
                                font.family: Constants.font.family
                            }
                        }
                        Rectangle {
                            color: "red"
                            Layout.preferredWidth: parent.width

                            height: 24
                            Layout.alignment: Qt.AlignTop
                            Text {
                                leftPadding: 8
                                text: qsTr("桌面")
                                font.family: Constants.font.family
                            }
                        }
                        Rectangle {
                            color: "red"
                            Layout.preferredWidth: parent.width
                            height: 24
                            Layout.alignment: Qt.AlignTop
                            Text {
                                leftPadding: 8
                                text: qsTr("文档")
                                font.family: Constants.font.family
                            }
                        }
                        Rectangle {
                            color: "red"
                            Layout.preferredWidth: parent.width
                            height: 24
                            Layout.alignment: Qt.AlignTop
                            Text {
                                leftPadding: 8
                                text: qsTr("下载")
                                font.family: Constants.font.family
                            }
                        }
                        Rectangle {
                            color: "red"
                            Layout.preferredWidth: parent.width
                            height: 24
                            Layout.alignment: Qt.AlignTop
                            Text {
                                leftPadding: 8
                                text: qsTr("音乐")
                                font.family: Constants.font.family
                            }
                        }
                        Rectangle {
                            color: "red"
                            Layout.preferredWidth: parent.width
                            height: 24
                            Layout.alignment: Qt.AlignTop
                            Text {
                                leftPadding: 8
                                text: qsTr("图片")
                                font.family: Constants.font.family
                            }
                        }
                        Rectangle {
                            color: "red"
                            Layout.preferredWidth: parent.width
                            height: 24
                            Layout.alignment: Qt.AlignTop
                            Text {
                                leftPadding: 8
                                text: qsTr("视频")
                                font.family: Constants.font.family
                            }
                        }
                        Rectangle {
                            color: "red"
                            Layout.preferredWidth: parent.width
                            height: 24
                            Layout.alignment: Qt.AlignTop
                            Text {
                                leftPadding: 8
                                text: qsTr("回收站")
                                font.family: Constants.font.family
                            }
                        }
                    }
                }
            }
        }
    }
}
