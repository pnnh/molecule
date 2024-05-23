import QtQuick 2.15
import QtQuick.Controls 2.5
import QtQuick.Layouts 1.3
import "polaris" as Polaris
import "venus" as Venus

Rectangle {
    anchors.fill: parent
    anchors.top: parent.top
    color: "#f8f8f8"
    radius: 8
    opacity: 1

    property bool showSidebar: true
    property string navbarName: "polaris"

    RowLayout {
        height: parent.height
        width: parent.width
        spacing: 0
        Rectangle {
            Layout.preferredHeight: parent.height
            color: "transparent"
            width: 48
            Layout.alignment: Qt.AlignLeft


            ColumnLayout {
                width: parent.width
                anchors.horizontalCenter: parent.horizontalCenter
                anchors.top: parent.top

                Profiles {
                    onProfileNameChanged: name =>{
                                              navbarName = name
                        }
                }

                Polaris.Navbar {
                    visible: navbarName === "polaris"
                }

                Venus.Navbar {
                    visible: navbarName === "venus"
                }
            }
        }
        Rectangle {
            Layout.alignment: Qt.AlignLeft
            Layout.preferredHeight: parent.height
            width: 1
            color: "#e2e2e2"
        }
        Loader {
            id: pageLoader
            Layout.preferredHeight: parent.height
            Layout.preferredWidth: parent.width - 48
            source: "qrc:/qt/qml/quick/content/polaris/Page.qml"
        }
    }


}
