import QtQuick 2.12


Window {
    visible: true;
    width: 800;
    height: 600;
    title: qsTr("Hello World");
    id: root;

    Row {

    Canvas {
        width: 300;
        height: 300;
        contextType: "2d";

        onPaint: {
            context.lineWidth = 2;
            context.strokeStyle = "blue";
            context.fillStyle = "red";
            context.save();
            context.translate(width/2, height/2);
            context.beginPath();
            context.arc(0, 0, 30, 0, Math.PI*2);
            context.arc(0, 0, 50, 0, Math.PI*2);
            context.arc(0, 0, 70, 0, Math.PI*2);
            context.arc(0, 0, 90, 0, Math.PI*2);
            context.stroke();
            context.restore();

            context.save();
            context.translate(width/2, 30);
            context.font = "26px serif";
            context.textAlign = "center";
            context.fillText("concentric circles", 0, 0);
            context.restore();
        }
    }

    Canvas {
        width: 480;
        height: 640;
        contextType: "2d";
        property string comicRole: "qrc:/pic.jpg";

        onPaint: {
            context.lineWidth = 2;
            context.strokeStyle = "blue";
            context.fillStyle = Qt.rgba(0.3, 0.5, 0.7, 0.5);

            context.save();
            context.translate(width/2, height/2);
            context.drawImage(comicRole, -68, -100, 137, 200);
            context.restore();

            context.save();
            context.translate(width/2, 0);
            context.shear(0.6, 0);
            context.drawImage(comicRole, 0, 0, 127, 200);
            context.restore();

            context.save();
            context.translate(width/2, 0);
            context.shear(-0.6, 0);
            context.drawImage(comicRole, -137, 0, 137, 200);
            context.restore();

            context.save();
            context.translate(0, height/2);
            context.shear(0.3, 0);
            context.rotate(Math.PI / 3);
            context.drawImage(comicRole, 0, -100, 137, 200);
            context.restore();

            context.save();
            context.translate(width/2, height/2);
            context.rotate(Math.PI/2);
            context.drawImage(comicRole, 120, -40, 137, 200);
            context.restore();

            context.save();
            context.setTransform(1.2, 0.5, 0, 0.7, width - 100, height - 120);
            context.drawImage(comicRole, 0, 0, 68, 100);
            context.restore();
        }
        Component.onCompleted: loadImage(comicRole);
        onImageLoaded: requestPaint();
    }

    }
}
