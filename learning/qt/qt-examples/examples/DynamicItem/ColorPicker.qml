import QtQuick 2.12

Rectangle {
    id: colorPicker;
    width: 50;
    height: 30;
    signal colorPicked(color clr);
    property Item loader;
    border.width: focus ? 2 : 0;
    border.color: focus ? "#90D750" : "#808080";
    MouseArea {
        anchors.fill: parent;
        onClicked: {
            colorPicker.colorPicked(colorPicker.color);
            loader.focus = true;
        }
    }
    Keys.onReturnPressed: {
        colorPicker.colorPicked(colorPicker.color);
        event.accepted = true;
    }
    Keys.onSpacePressed: {
        colorPicker.colorPicked(colorPicker.color);
        event.accepted = true;
    }
}
