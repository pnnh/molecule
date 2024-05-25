import QtQuick 2.15
import QtQuick.Controls 2.5
import QtQuick.Layouts 1.3

Rectangle {
    color: "#ccc"
    height: 36
    width: 36
    Layout.topMargin: 16
    Layout.alignment: Qt.AlignVTop | Qt.AlignHCenter
    border.color: "#eee"
    border.width: 1
    radius: 8

    Image {
        id: bug
        width: parent.width
        height: parent.height
        anchors.centerIn: parent
        source: "qrc:/qt/qml/quick/content/assets/photos/photo1.webp"

        opacity: 1
        smooth: false

        layer.enabled: true
        layer.effect: ShaderEffect {
            property var src: bug
            property int radius: 24
            property var pixelStep: Qt.vector2d(1/src.width, 1/src.height)
            fragmentShader: "qrc:/content/shaders/rounded.frag.qsb"
        }
    }
}
