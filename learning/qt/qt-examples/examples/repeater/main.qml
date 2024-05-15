import QtQuick 2.9
import QtQuick.Window 2.9

Window {
    id: root
    visible: true
    width: 500
    height: 600
    title: qsTr("QML调用Cpp对象")
    color: "white"

    Column {
        id: myColumn
        anchors.fill: parent
        spacing: 10

        Rectangle {
            width: 400
            height: 400
            color: "black"

            Grid {
                x: 5
                y: 5
                rows: 5
                columns: 5
                spacing: 10

                Repeater {
                    model: 24
                    Rectangle {
                        width: 70
                        height: 70
                        color: "lightgreen"

                        Text {
                            text: index
                            font.pointSize: 30
                            anchors.centerIn: parent
                        }
                    }
                }
            }
        }
        Row {
            Repeater {
                model: ["red", "blue", "green"]

                Rectangle {
                    width: 80
                    height: 50
                    color: modelData
                }
            }
        }

        ListModel {
            /* 数据项 */
            id: myModel
            ListElement {
                colour: "red"
            }
            ListElement {
                colour: "blue"
            }
            ListElement {
                colour: "green"
            }
        }

        Component {
            /* 代理项(实例) */
            id: myDelegate
            Rectangle {
                width: 80
                height: 50
                color: colour /* 通过数据项(model)映射获得。*/

                MouseArea {
                    anchors.fill: parent
                    /* 点击添加一个数据项，界面因此会多一个项显示。*/
                    onClicked: myModel.append({
                                                  "colour": "lightblue"
                                              })
                }
            }
        }

        Row {
            Repeater {
                id: repeater
                model: myModel
                delegate: myDelegate
                onItemAdded: console.log("Add Item.", index, item.color)
                onItemRemoved: console.log("Remove Item.", index, item.color)
            }
        }
    }
}
