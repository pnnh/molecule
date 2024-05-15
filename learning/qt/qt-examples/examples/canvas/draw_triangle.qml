import QtQuick 2.12


Window {
    visible: true
    width: 640
    height: 480
    title: qsTr("Hello World")

    Canvas {
        width: 400;
        height: 240;
        contextType: "2d";

        onPaint: {
            context.lineWidth = 2;
            context.strokeStyle = "red";
            context.fillStyle = "blue";
            context.beginPath();
            context.moveTo(100, 80);
            context.lineTo(100, 200);
            context.lineTo(300, 200);
            context.closePath();
            context.fill();
            context.stroke();
        }
    }
}
