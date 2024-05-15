import QtQuick
import QtQuick.Window
import QtQuick.Controls

Window {
    width: 800
    height: 600
    visible: true
    title: "He嗯嗯嗯rld"

    Column {
        id: myColumn
        anchors.fill: parent
        spacing: 10

        Row {
            spacing: 10

            Text {
                width: 90
                height: 30
                verticalAlignment: Text.AlignVCenter
                renderType: Text.NativeRendering
                text: "TextArea:"
            }

            ScrollView {
                id: textarea1View
                width: 200
                height: 60
                background: Rectangle {
                    border.color: "blue"
                    border.width: 2
                }
                clip: true
                ScrollBar.horizontal: ScrollBar {
                    visible: false
                }

                TextArea {
                    id: textarea1
                    width: textarea1View.width
                    padding: 5
                    color: "black"
                    //无输入时的提示文本
                    placeholderText: "输入内容"
                    placeholderTextColor: "gray"
                    //text: "<p>Gong Jian Bo</p>"
                    //支持富文本
                    //textFormat: TextEdit.RichText
                    //默认Text.QtRendering看起来比较模糊
                    renderType: Text.NativeRendering
                    //文本换行，默认NoWrap
                    wrapMode: TextEdit.Wrap
                }
            }
        }

        Text {
            id: txtRandom
            text: "将显示产生的随机字符串"
            width: 50
            font.pointSize: 16
            elide: Text.ElideNone
        }
        Row {
            spacing: 10

            Text {
                width: 90
                text: "选择长度:"
            }
            ComboBox {
                id: cmbLength
                width: 200
                currentIndex: 1
                model: [8, 16, 20, 24, 32, 64]
            }
        }
        Row {
            spacing: 10

            Text {
                width: 90
                text: "选择字符范围:"
            }
            CheckBox {
                checked: true
                text: qsTr("大写字母")
            }
            CheckBox {
                checked: true
                text: qsTr("小写字母")
            }
            CheckBox {
                checked: true
                text: qsTr("数字")
            }
            CheckBox {
                id: chkSymbol
                checked: false
                text: qsTr("特殊字符")
            }
        }
        Button {
            text: "点击产生随机字符串" // 按钮文本

            // 信号槽连接
            onClicked: {
                console.log("随机字符被点击了: " + cmbLength.currentText)
                var result = voronoi.random(textarea1.text,
                                            cmbLength.currentText,
                                            chkSymbol.checked)
                txtRandom.text = result
            }
        }
    }
}
