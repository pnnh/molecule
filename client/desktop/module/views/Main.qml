
import QtQuick.Window 2.15
import QtQml.Models 2.15
import QtQuick 2.15
import QtQuick.Controls 2.15

Window {
    id: mainWindow
    width: 1392
    height: 954
    flags: Qt.Window | Qt.CustomizeWindowHint //Qt.FramelessWindowHint

    visible: true
    title: "Emotion Design"

    Component.onCompleted: {
        // Commenting this to use properties instead of setters
        //setX(Screen.width / 2 - width / 2);
        //setY(Screen.height / 2 - height / 2);
        x = Screen.width / 2 - width / 2
        y = Screen.height / 2 - height / 2

    }

    onWidthChanged: {
        console.debug("onWidthChanged")
        app.windowResize()
        }

        onHeightChanged: {
            console.debug("onHeightChanged")
            app.windowResize()
        }


    App {
        id: app
        anchors.fill: parent
    }
}
