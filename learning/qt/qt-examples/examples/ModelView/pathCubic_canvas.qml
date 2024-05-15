import QtQuick 2.9
import QtQuick.Controls 2.0
import QtQuick.Window 2.9
import QtQuick.Layouts 1.12

Window {
    visible: true;
    width: 800;
    height: 600;
    title: qsTr("Hello World");

    Canvas {
        width: 320;
        height: 240;
        id: root;

        onPaint: {
            var ctx = getContext("2d");
            ctx.lineWidth = 4;
            ctx.strokeStyle = "red";
            ctx.beginPath();
            ctx.moveTo(16, 16);
            ctx.bezierCurveTo(0, height - 1, width - 1, height / 2,
                              width -16, height - 16);
            ctx.storke();
        }
        Text {
            anchors.centerIn: parent;
            font.pixelSize: 20;
            text: "cubic Bazier curve";
        }
        Rectangle {
            width: 32;
            height: 32;
            radius: 16;
            color: "blue";
            id: ball;
            MouseArea {
                anchors.fill: parent;
                id: mouseArea;
                onClicked: pathAnim.start();
            }
            PathAnimation {
                id: pathAnim;
                target: ball;
                duration: 3000;
                anchorPoint: "16, 16";
                easing.type: Easing.InCubic;
                path: Path {
                    startX: 16;
                    startY: 16;
                    PathCubic {
                        x: root.width - 16;
                        y: root.height - 16;
                        control1X: 0;
                        control1Y: root.height - 1;
                        control2X: root.width - 1;
                        control2Y: root.height / 2;
                    }
                }
            }
        }
    }
}
