import QtQuick 2.12
import QtQuick.Window 2.12

Window {
    visible: true
    width: 640
    height: 480
    title: qsTr("Hello World")

    Column {
        anchors.fill: parent
        spacing: 10
        Canvas {
            width: 400;
            height: 240;

            onPaint: {
                var ctx = getContext("2d");
                ctx.lineWidth = 2;
                ctx.strokeStyle = "red";
                ctx.fillStyle = "blue";
                ctx.beginPath();
                ctx.rect(100, 80, 120, 80);
                ctx.fill();
                ctx.stroke();
            }
        }

        Canvas {
            width: 500;
            height: 300;
            contextType: "2d";

            onPaint: {
                context.lineWidth = 2;
                context.strokeStyle = "green";
                context.fillStyle = "yellow";
                context.beginPath();
                context.rect(150, 120, 120, 80);
                context.fill();
                context.stroke();
            }
        }
    }


}
