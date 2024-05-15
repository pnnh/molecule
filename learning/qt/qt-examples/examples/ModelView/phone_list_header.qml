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
        id: phoneModel;
        ListModel {
            ListElement {
                name: "iPhone A";
                cost: "130";
                manufacturer: "Apple2";
            }
            ListElement {
                name: "iPhone hjS";
                cost: "1500";
                manufacturer: "Appl4e";
            }
            ListElement {
                name: "iPhone 36";
                cost: "102200";
                manufacturer: "Appl223e";
            }
            ListElement {
                name: "iPhone 3G33S";
                cost: "2300";
                manufacturer: "A32le";
            }
            ListElement {
                name: "iPhone 22S";
                cost: "1230";
                manufacturer: "A434le";
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
    }

    Component {
        id: headerView;
        Item {
            width: parent.width;
            height: 30;
            RowLayout {
                anchors.left: parent.left;
                anchors.verticalCenter: parent.verticalCenter;
                spacing: 8;
                Text {
                    text: "Name";
                    font.bold: true;
                    font.pixelSize: 20;
                    Layout.preferredWidth: 120;
                }
                Text {
                    text: "Cost";
                    font.bold: true;
                    font.pixelSize: 20;
                    Layout.preferredWidth: 80;
                }
                Text {
                    text: "Manufacturer";
                    font.bold: true;
                    font.pixelSize: 20;
                    Layout.fillWidth: true;
                }
            }
        }
    }

    Component {
        id: footerView;
        Item {
            id: footerRootItem;
            width: parent.width;
            height: 30;
            property alias text: txt.text;
            signal clean();
            signal add();
            signal moveDown();

            Text {
                id: txt;
                anchors.left: parent.left;
                anchors.top: parent.top;
                anchors.bottom: parent.bottom;
                width: parent.width;
                font.italic: true;
                color: "blue";
                height: 30;
                verticalAlignment: Text.AlignVCenter;
            }
            Button {
                id: clearAll;
                anchors.right: parent.right;
                anchors.verticalCenter: parent.verticalCenter;
                text: "Clear";
                onClicked: footerRootItem.clean();
            }
            Button {
                id: addOne;
                anchors.right: clearAll.left;
                anchors.rightMargin: 4;
                anchors.verticalCenter: parent.verticalCenter;
                text: "Add";
                onClicked: footerRootItem.add();
            }
            Button {
                id: moveDown;
                anchors.right: addOne.left;
                anchors.rightMargin: 4;
                anchors.verticalCenter: parent.verticalCenter;
                text: "Down";
                onClicked: footerRootItem.moveDown();
            }
        }
    }


    Component {
        id: phoneDelegate;
        Item {
            id: wrapper;
            width: parent.width;
            height: 30;

            MouseArea {
                anchors.fill: parent;
                onClicked: {
                    wrapper.ListView.view.currentIndex = index;
                    mouse.accepted = true;
                }
                onDoubleClicked: {
                    wrapper.ListView.view.model.remove(index);
                    mouse.accepted = true;
                }
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

    Component {
        id: sectionHeader;
        Rectangle {
            width: parent.width;
            height: childrenRect.height;
            color: "lightsteelblue";
            Text {
                text: section;
                font.bold: true;
                font.pixelSize: 20;
            }
        }
    }

    ListView {
        id: listView;
        anchors.fill: parent;
        delegate: phoneDelegate;
        model: phoneModel.createObject(listView);
        header: headerView;
        footer: footerView;
        focus: true;
        highlight: Rectangle {
            color: "lightblue";
        }
        section.property: "manufacturer";
        section.criteria: ViewSection.FullString;
        section.delegate: sectionHeader;
        onCurrentIndexChanged: {
            if (listView.currentIndex >= 0) {
                var data = listView.model.get(listView.currentIndex);
                listView.footerItem.text = data.name + ", " + data.cost + ", " +
                        data.manufacturer;
            } else {
                listView.footerItem.text = " ";
            }
        }
        add: Transition {
            ParallelAnimation {
                NumberAnimation {
                    property: "opacity";
                    from: 0;
                    to: 1.0;
                    duration: 1000;
                }
                NumberAnimation {
                    property: "y";
                    from: 0;
                    duration: 1000;
                }
            }
        }
        displaced: Transition {
            SpringAnimation {
                property: "y";
                spring: 3;
                damping: 0.1;
                epsilon: 0.25;
            }
        }
        remove: Transition {
            SequentialAnimation {
                NumberAnimation {
                    properties: "y";
                    to: 0;
                    duration: 600;
                }
                NumberAnimation {
                    property: "opacity";
                    to: 0;
                    duration: 400;
                }
            }
        }
        move: Transition {
            NumberAnimation {
                property: "y";
                duration: 700;
                easing.type: Easing.InQuart;
            }
        }
        populate: Transition {
            NumberAnimation {
                property: "opacity";
                from: 0;
                to: 1.0;
                duration: 1000;
            }
        }

        function addOne() {
            model.insert(Math.round(Math.random() * model.count),
                         { "name": "MX3", "cost": "1799", "manufacturer": "MeiZu" });
        }

        function moveDown() {
            if (currentIndex + 1 < model.count) {
                model.move(currentIndex, currentIndex + 1, 1);
            }
        }


        Component.onCompleted: {
            listView.footerItem.clean.connect(listView.model.clear);
            listView.footerItem.add.connect(listView.addOne);
            listView.footerItem.moveDown.connect(listView.moveDown);
        }
    }
}
