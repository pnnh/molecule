import QtQuick
import QtQuick.Window

Window {
    id: mainWindow
    objectName: "mainWindow"

    function sayHello() {
        console.log("hello from mainWindow")
    }

    height: 800
    title: "Emotion Design"
    visible: true
    width: 1280

    Component.onCompleted: {
        setX(Screen.width / 2 - width / 2)
        setY(Screen.height / 2 - height / 2)
        x = Screen.width / 2 - width / 2
        y = Screen.height / 2 - height / 2
    }
    onHeightChanged: {
        console.debug("onHeightChanged")
        //app.windowResize()
    }
    onWidthChanged: {
        console.debug("onWidthChanged")
        //app.windowResize()
    }

    App {
        id: app

        anchors.fill: parent
    }
}
