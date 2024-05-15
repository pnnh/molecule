import QtQuick 2.9
import QtQuick.Controls 2.0
import QtQuick.Window 2.9
import Qt.labs.platform 1.0
import an.qt.ImageProcessor 1.0

Window {
    objectName: "rootObject";
    width: 640;
    height: 480;
    visible: true;
    color: "#121212";

    BusyIndicator {
        id: busy;
        running: false;
        anchors.centerIn: parent;
        z: 2;
    }
    Label {
        id: stateLabel;
        visible: false;
        anchors.centerIn: parent;
    }
    Image {
        objectName: "imageViewer";
        id: imageViewer;
        asynchronous: true;
        anchors.fill: parent;
        fillMode: Image.PreserveAspectFit;
        onStatusChanged: {
            if (imageViewer.status === Image.Loading) {
                busy.running = true;
                stateLabel.visible = false;
            }
            else if (imageViewer.status === Image.Ready) {
                busy.running = false;
            }
            else if (imageViewer.status === Image.Error) {
                busy.running = false;
                stateLabel.visible = true;
                stateLabel.text = "ERROR";
            }
        }
    }

    ImageProcessor {
        id: processor;
        onFinished: (newFile) => {
            imageViewer.source = "file:///" + newFile;
        }
    }

    FileDialog {
        id: fileDialog;
        title: "Please choose a file";
        nameFilters: ["Image Files (*.jpg *.png *.gif)"];
        onAccepted: {
            console.log("file：", fileDialog.file);
            imageViewer.source = fileDialog.file;
        }
    }

    Button {
        id: openFile;
        text: "打开";
        anchors.left: parent.left;
        anchors.leftMargin: 6;
        anchors.top: parent.top;
        anchors.topMargin: 6;
        onClicked: {
            fileDialog.visible = true;
        }
        z: 1;
    }

    Button {
        id: quit;
        text: "退出";
        anchors.left: openFile.right;
        anchors.leftMargin: 4;
        anchors.bottom: openFile.bottom;
        onClicked: {
            Qt.quit();
        }
        z: 1;
    }

    Rectangle {
        anchors.left: parent.left;
        anchors.top: parent.top;
        anchors.bottom:  openFile.bottom;
        anchors.bottomMargin: -6;
        anchors.right: quit.right;
        anchors.rightMargin: -6;
        color: "#404040";
        opacity: 0.7;
    }
    Grid {
        id: op;
        anchors.left: parent.left;
        anchors.leftMargin: 4;
        anchors.bottom: parent.bottom;
        anchors.bottomMargin: 4;
        rows: 2;
        columns: 3;
        rowSpacing: 4;
        columnSpacing: 4;
        z: 1;

        Button {
            text: "柔化";
            onClicked:  {
                busy.running = true;
                processor.process(fileDialog.file, ImageProcessor.Soften);
            }
        }
        Button {
            text: "灰度";
            onClicked:  {
                busy.running = true;
                processor.process(fileDialog.file, ImageProcessor.Gray);
            }
        }
        Button {
            text: "浮雕";
            onClicked:  {
                busy.running = true;
                processor.process(fileDialog.file, ImageProcessor.Emboss);
            }
        }
        Button {
            text: "黑白";
            onClicked:  {
                busy.running = true;
                processor.process(fileDialog.file, ImageProcessor.Binarize);
            }
        }
        Button {
            text: "底片";
            onClicked:  {
                busy.running = true;
                processor.process(fileDialog.file, ImageProcessor.Negative);
            }
        }
        Button {
            text: "锐化";
            onClicked:  {
                busy.running = true;
                processor.process(fileDialog.file, ImageProcessor.Sharpen);
            }
        }
    }

    Rectangle {
        anchors.left: parent.left;
        anchors.top: op.top;
        anchors.topMargin: -4;
        anchors.bottom: parent.bottom;
        anchors.right: op.right;
        anchors.rightMargin: -4;
        color: "#404040";
        opacity: 0.7;
    }
}
