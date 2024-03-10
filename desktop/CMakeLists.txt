cmake_minimum_required(VERSION 3.15)

project(polaris-desktop VERSION 0.1 LANGUAGES C CXX OBJC OBJCXX Swift)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)
set(CMAKE_INCLUDE_CURRENT_DIR ON)

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

qt6_add_executable(polaris-desktop
        MANUAL_FINALIZATION
        ${PROJECT_SOURCES})

target_link_libraries(polaris-desktop
        PRIVATE Qt6::Core Qt6::Qml Qt6::Gui Qt6::Quick Qt6::QuickControls2 Qt6::Sql
        Qt6::Widgets
        "-framework AppKit")

qt6_add_qml_module(polaris-desktop
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
