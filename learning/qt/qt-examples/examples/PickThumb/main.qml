import QtQuick 2.9
import QtQuick.Controls 2.0
import QtQuick.Window 2.9
import Qt.labs.platform 1.0

Window {
    visible: true;
    width: 800;
    height: 600;
    minimumWidth: 480;
    minimumHeight: 320;
    title: qsTr("Hello World");
    color: "black";

    onWidthChanged: mask.recalc();
    onHeightChanged: mask.recalc();

    Image {
        id: source;
        anchors.fill: parent;
        fillMode: Image.PreserveAspectFit;
        visible: false;
        asynchronous: true;
        onStatusChanged: {
            if (status == Image.Ready) {
                console.log("image loaded");
                mask.recalc();
            }
        }
    }

    FileDialog {
        id: fileDialog;
        title: "Please choose an Image File";
        nameFilters: ["Image Files (*.jpg *.png *.gif)"];
        onAccepted: {
            source.source = fileDialog.file;
        }
    }

    Canvas {
        id: forSaveCanvas;
        width: 128;
        height: 128;
        contextType: "2d";
        visible: false;
        z: 2;
        anchors.top: parent.top;
        anchors.right: parent.right;
        anchors.margins: 4;

        property var imageData: null;
        onPaint: {
            if (imageData != null) {
                console.log("forSaveCanvas loaded");
                context.drawImage(imageData, 0, 0);
            }
        }
        function setImageData(data) {
            imageData = data;
            requestPaint();
        }
    }

    Canvas {
        id: mask;
        anchors.fill: parent;
        z: 1;
        property real w: width;
        property real h: height;
        property real dx: 0;
        property real dy: 0;
        property real dw: 0;
        property real dh: 0;
        property real frameX: 66;
        property real frameY: 66;

        function calc() {
            var sw = source.sourceSize.width;
            var sh = source.sourceSize.height;
            if(sw>0 && sh >0) {
                if (sw<=w && sh <= h) {
                    dw = sw;
                    dh = sh;
                } else {
                    var sRatio = sw / sh;
                    dw = sRatio * h;
                    if (dw > w) {
                        dh = w / sRatio;
                        dw = w;
                    } else {
                        dh = h;
                    }
                }
                dx = (w - dw) / 2;
                dy = (h - dh) / 2;
            }
        }

        function recalc() {
            calc();
            requestPaint();
        }

        function getImageData() {
            return context.getImageData(frameX - 64, frameY - 64, 128, 128);
        }

        onPaint: {
            var ctx = getContext("2d");
            if (dw < 1 || dh < 1) {
                ctx.fillStyle = "#0000a0";
                ctx.font = "20pt sans-serif";
                ctx.textAlign = "center";
                ctx.fillText("Please Choose An Image File", width / 2, height / 2);
                return;
            }
            ctx.clearRect(0, 0, width, height);
            ctx.drawImage(source, dx, dy, dw,  dh);
            var xStart = frameX - 66;
            var yStart = frameY = 66;
            ctx.save();
            ctx.fillStyle = "#a0000000";
            ctx.fillRect(0, 0, w, yStart);
            var yOffset = yStart + 132;
            ctx.fillRect(0, yOffset, w, h - yOffset);
            ctx.fillRect(0, yStart, xStart, 132);
            var xOffset = xStart + 132;
            ctx.fillRect(xOffset, yStart, w-xStart,132);

            // see through area
            ctx.strokeStyle = "red";
            ctx.fillStyle = "#a000000";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.rect(xStart, yStart, 132, 132);
            ctx.fill();
            ctx.stroke();
            ctx.closePath();
            ctx.restore();
        }
    }

    MultiPointTouchArea {
        anchors.fill: parent;
        minimumTouchPoints: 1;
        maximumTouchPoints: 1;
        touchPoints: [
            TouchPoint{
                id: point1;
            }
        ]

        onUpdated: {
            mask.frameX = point1.x;
            mask.frameY = point1.y;
            mask.requestPaint();
        }
        onReleased: {
            forSaveCanvas.setImageData(mask.getImageData());
            actionPanel.visible = true;
        }
        onPressed: {
            actionPanel.visible= false;
        }
    }

    Row {
        anchors.horizontalCenter: parent.horizontalCenter;
        anchors.bottom: parent.bottom;
        anchors.bottomMargin: 20;
        id: actionPanel;
        z: 5;
        spacing: 8;
        Button {
            background: Rectangle {
                implicitWidth: 70;
                implicitHeight: 30;
                border.width: 2;
                border.color: "#c0c0c0";
                color: "#a0a0a0";
            }
            text: "Open";
            onClicked: fileDialog.open();
        }
        Button {
            background: Rectangle {
                implicitWidth: 70;
                implicitHeight: 30;
                border.width: 2;
                border.color: "#c0c0c0";
                color: "#a0a0a0";
            }
            text: "Save";
            onClicked: {
                forSaveCanvas.save("selected.png");
                actionPanel.visible = false;
            }
        }
        Button {
            background: Rectangle {
                implicitWidth: 70;
                implicitHeight: 30;
                border.width: 2;
                border.color: "#c0c0c0";
                color: "#a0a0a0";
            }
            text: "Cancel";
            onClicked: actionPanel.visible = false;
        }
    }


}
