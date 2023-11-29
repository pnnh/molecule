include_directories(module)

find_package(Qt6 COMPONENTS Core Quick Gui QuickControls2 Sql REQUIRED)
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
        models/sqliteModel.h)

qt6_add_executable(polaris
        MANUAL_FINALIZATION
        ${PROJECT_SOURCES})

target_link_libraries(polaris
        PRIVATE Qt6::Core Qt6::Gui Qt6::Quick Qt6::QuickControls2 Qt6::Sql)

qt6_add_qml_module(polaris
        URI quick
        VERSION 1.0
        SOURCES
        include/mytype.h
        models/mytype.cc
        QML_FILES
        module/Main.qml
        module/list_videos.qml
        module/App.qml
        module/Topbar.qml
        module/FxScrollBar.qml
        module/TaskList.qml
        module/NavList.qml
        RESOURCES
        assets/images/flag-fill.png
        assets/images/files.svg)
