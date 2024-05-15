qt6_add_qml_module(mylib
        URI mylib
        VERSION 1.0
        SOURCES
            mytype.h mytype.cc
        QML_FILES
            FramedImage.qml
        RESOURCES
            img/cat.jpeg    )