
import QtQuick
import QtQuick.Window

Window {
    id: mainWindow
    width: 1280
    height: 800

    visible: true
    title: "Emotion Design"

    Component.onCompleted: {
        setX(Screen.width / 2 - width / 2);
        setY(Screen.height / 2 - height / 2);
        x = Screen.width / 2 - width / 2
        y = Screen.height / 2 - height / 2
    }

    onWidthChanged: {
        console.debug("onWidthChanged")
        //app.windowResize()
    }

    onHeightChanged: {
        console.debug("onHeightChanged")
        //app.windowResize()
    }

    App {
        id: app
        anchors.fill: parent
    }
}
