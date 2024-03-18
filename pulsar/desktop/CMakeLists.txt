
find_package(Qt6 COMPONENTS Core Qml Quick Gui QuickControls2 Sql Widgets REQUIRED)
qt_standard_project_setup(REQUIRES 6.5)

set(PROJECT_SOURCES
        main.cpp
        utils/md5.cc
        utils/md5.h
        wasm/wasm.h
        sqlite/sqlite.cc
        sqlite/sqlite.h
        models/videoListModel.cc
        models/videoListModel.h
        models/sqliteModel.cc
        models/sqliteModel.h
        platform/macos/macwindow.h
        platform/macos/macwindow.mm
        platform/macos/WindowController.mm
        platform/macos/WindowController.h
)

qt6_add_executable(pulsar-desktop
        MANUAL_FINALIZATION
        ${PROJECT_SOURCES})

set(LINK_LIBRARIES
        Qt6::Core
        Qt6::Qml
        Qt6::Quick
        Qt6::Gui
        Qt6::QuickControls2
        Qt6::Sql
        Qt6::Widgets )

if (APPLE)
        list(append LINK_LIBRARIES "-framework AppKit")
endif()

target_link_libraries(pulsar-desktop PRIVATE ${LINK_LIBRARIES})

qt6_add_qml_module(pulsar-desktop
        URI quick
        VERSION 1.0
        QML_FILES
        content/list_videos.qml
        content/App.qml
        content/Topbar.qml
        content/FxScrollBar.qml
        content/TaskList.qml
        content/NavList.qml
        RESOURCES
        content/assets/images/flag-fill.png
        content/assets/images/files.svg)
