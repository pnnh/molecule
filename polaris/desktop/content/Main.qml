import QtQuick
import QtQuick.Controls
import QtQuick.Layouts

Window {
    id: mainWindow
    visible: true
    width: 960
    height: 720
    color: "transparent"
    title: qsTr("Polaris Editor")
    flags: Qt.Window | Qt.FramelessWindowHint | Qt.CustomizeWindowHint |
           Qt.WindowSystemMenuHint | Qt.WindowMinimizeButtonHint | Qt.WindowMaximizeButtonHint

    Component.onCompleted: {
        x = Screen.width / 2 - width / 2
        y = Screen.height / 2 - height / 2
    }

    App {
        id: app
    }

    onWidthChanged: {
        console.debug("onWidthChanged")
        app.windowResize()
    }

    onHeightChanged: {
        console.debug("onHeightChanged")
        app.windowResize()
    }
}
