import QtQuick 2.9
import QtQuick.Controls 2.0
import QtQuick.Window 2.9
import QtQuick.Layouts 1.12

Window {
    visible: true;
    width: 800;
    height: 600;
    title: qsTr("Hello World");


    Component {
        id: phoneDelegate;
        Item {
            id: wrapper;
            width: parent.width;
            height: 30;

            MouseArea {
                anchors.fill: parent;
                onClicked: wrapper.ListView.view.currentIndex = index;
            }

            RowLayout {
                anchors.left: parent.left;
                anchors.verticalCenter: parent.verticalCenter;
                spacing: 8;
                Text {
                    id: coll;
                    text: name;
                    color: wrapper.ListView.isCurrentItem ? "red" : "black";
                    font.pixelSize: wrapper.ListView.isCurrentItem ? 22 : 18;
                    Layout.preferredWidth: 120;
                }
                Text {
                    text: cost;
                    color: wrapper.ListView.isCurrenntItem ? "red" : "black";
                    font.pixelSize: wrapper.ListView.isCurrentItem ? 22 : 18;
                    Layout.preferredWidth: 80;
                }
                Text {
                    text: manufacturer;
                    color: wrapper.ListView.isCurrentItem ? "red" : "black";
                    font.pixelSize: wrapper.ListView.isCurrentItem ? 22 : 18;
                    Layout.fillWidth: true;
                }
            }
        }
    }

    ListView {
        id: listView;
        anchors.fill: parent;
        delegate: phoneDelegate;

        model: ListModel {
            id: phoneModel;
            ListElement {
                name: "iPhone 3GS";
                cost: "1000";
                manufacturer: "Apple";
            }
            ListElement {
                name: "iPhone 3GS";
                cost: "1000";
                manufacturer: "Apple";
            }
            ListElement {
                name: "iPhone 3GS";
                cost: "1000";
                manufacturer: "Apple";
            }
            ListElement {
                name: "iPhone 3GS";
                cost: "1000";
                manufacturer: "Apple";
            }
            ListElement {
                name: "iPhone 3GS";
                cost: "1000";
                manufacturer: "Apple";
            }
            ListElement {
                name: "iPhone 3GS";
                cost: "1000";
                manufacturer: "Apple";
            }
            ListElement {
                name: "iPhone 3GS";
                cost: "1000";
                manufacturer: "Apple";
            }
            ListElement {
                name: "iPhone 3GS";
                cost: "1000";
                manufacturer: "Apple";
            }
            ListElement {
                name: "iPhone 3GS";
                cost: "1000";
                manufacturer: "Apple";
            }
        }
        focus: true;
        highlight: Rectangle {
            color: "lightblue";
        }
    }
}
