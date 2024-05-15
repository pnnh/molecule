import QtQuick
import QtQuick.Window
import QtQuick.Controls

Window {
    id: root
    visible: true
    width: 500
    height: 600
    title: qsTr("QML调用Cpp对象")
    color: "white"

    Rectangle {
        width: 320;
        height: 480;
        color: "gray";

        focus: true;
        Keys.enabled: true;
        Keys.onEscapePressed: {
            Qt.quit();
        }
        Keys.forwardTo: [moveText, likeQt];

        Text {
            id: moveText;
            x: 20;
            y: 20;
            width: 200;
            height: 30;
            text: "Moving Text";
            color: "blue";
            font { bold: true; pixelSize: 24; }
            Keys.enabled: true;
            Keys.onPressed: {
                switch(event.key) {
                    case Qt.Key_Left:
                        x -= 10;
                        break;
                    case Qt.Key_Right:
                        x += 10;
                        break;
                    case Qt.Key_Down:
                        y += 10;
                        break;
                    case Qt.Key_Up:
                        y -= 10;
                        break;
                    default:
                        return;
                }
                event.accepted = true;
            }
        }

        CheckBox {
            id: likeQt;
            text: "Like Qt Quick";
            anchors.left: parent.left;
            anchors.leftMargin: 10;
            anchors.bottom: parent.bottom;
            anchors.bottomMargin: 10;
            z: 1;
        }
    }
}
