
include_directories(module)

find_package(Qt6 COMPONENTS Core Qml QmlModels Quick Gui QuickLayouts QuickControls2 Sql REQUIRED)

qt_standard_project_setup(REQUIRES 6.5)

#FILE(GLOB PROJECT_SOURCES main.cpp delegates/**.* providers/**.* services/**.*)
qt6_add_executable(venus
        MANUAL_FINALIZATION
        main.cpp
        delegates/FolderDelegate.cpp delegates/FolderDelegate.h
        business/AppException.cpp business/AppException.h
        providers/FolderProvider.cpp providers/FolderProvider.h
        providers/PictureProvider.cpp providers/PictureProvider.h
        services/SqliteService.cpp services/SqliteService.h
        macos/objc_code.mm macos/objc_code.h)

FILE(GLOB RESOURCES assets/images/icons/**.*)
message(STATUS "RESOURCES: " ${RESOURCES})

qt6_add_qml_module(venus
        URI quick
        VERSION 1.0
        RESOURCES
        ${RESOURCES}  # 好像这种做法没有效果
        QML_FILES
        module/views/App.qml
        module/views/Main.qml
        module/views/Cell.qml
        module/views/Model.qml
        module/views/partial/Sidebar.qml
        module/views/partial/Topbar.qml
        SOURCES
        module/FolderListModel.cpp
        module/FolderListModel.h
        module/PictureGridModel.cpp
        module/PictureGridModel.h)


add_dependencies(venus sqlite3)

target_link_libraries(venus
        PRIVATE Qt6::Core Qt6::Gui Qt6::Qml Qt6::QmlModels Qt6::Quick Qt6::QuickControls2 Qt6::Sql sqlite3)