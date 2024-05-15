import QtQuick 2.12
import QtQuick.Window 2.12

Window {
    visible: true
    width: 640
    height: 480
    title: qsTr("Hello World")

    Canvas {
        width: 400;
        height: 240;

        onPaint: {
            var ctx = getContext("2d");
            ctx.lineWidth = 2;
            ctx.strokeStyle = "red";

            var gradient=context.createRadialGradient(40,40,70,80,80, 50);
            gradient.addColorStop(0.0, Qt.rgba(1,0,0,0.5));
            gradient.addColorStop(0.5, Qt.rgba(0,1,0,0.5));
            gradient.addColorStop(1.0, Qt.rgba(0,0,1,0.5));
            context.fillStyle=gradient;
            context.beginPath();
            context.rect(0, 0, 100, 100);
            context.fill();
            context.stroke();

            gradient = ctx.createLinearGradient(60, 50, 180, 130);
            gradient.addColorStop(0.0, Qt.rgba(1, 0, 0, 1.0));
            gradient.addColorStop(1.0, Qt.rgba(0, 0, 1, 1.0));
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.rect(60, 50, 120, 80);
            ctx.fill();
            ctx.stroke();

            gradient = ctx.createRadialGradient(230, 160, 30, 260, 200, 20);
            gradient.addColorStop(0.0, Qt.rgba(1, 0, 0, 0.4));
            gradient.addColorStop(0.5, Qt.rgba(0, 1, 0, 0.7));
            gradient.addColorStop(1.0, Qt.rgba(0, 0, 1, 0.5));
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.rect(200, 140, 80, 80);
            ctx.fill();
            ctx.stroke();
        }
    }


}
