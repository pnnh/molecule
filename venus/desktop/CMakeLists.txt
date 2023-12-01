cmake_minimum_required(VERSION 3.15)

project(venus-desktop VERSION 0.1 LANGUAGES C CXX)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

set(CMAKE_INCLUDE_CURRENT_DIR ON)
include_directories(src)
include_directories(src/module)

add_subdirectory(third_party/sqlite3)


find_package(Qt6 COMPONENTS Core Qml QmlModels Quick Gui QuickLayouts QuickControls2 Sql REQUIRED)

qt_standard_project_setup(REQUIRES 6.5)

qt6_add_executable(venus-desktop
        MANUAL_FINALIZATION
        src/main.cpp
        src/delegates/FolderDelegate.cpp 
        src/delegates/FolderDelegate.h
        src/business/AppException.cpp 
        src/business/AppException.h
        src/providers/FolderProvider.cpp 
        src/providers/FolderProvider.h
        src/providers/PictureProvider.cpp 
        src/providers/PictureProvider.h
        src/services/SqliteService.cpp 
        src/services/SqliteService.h
        src/macos/objc_code.mm 
        src/macos/objc_code.h)

# FILE(GLOB RESOURCES assets/images/icons/**.*)
# message(STATUS "RESOURCES: " ${RESOURCES})

qt6_add_qml_module(venus-desktop
        URI quick
        VERSION 1.0
        RESOURCES
        assets/images/icons/bigimg.svg
        assets/images/icons/folder.svg
        QML_FILES
        src/module/views/App.qml
        src/module/views/Main.qml
        src/module/views/Cell.qml
        src/module/views/Model.qml
        src/module/views/partial/Sidebar.qml
        src/module/views/partial/Topbar.qml
        SOURCES
        src/module/FolderListModel.cpp
        src/module/FolderListModel.h
        src/module/PictureGridModel.cpp
        src/module/PictureGridModel.h)


add_dependencies(venus-desktop sqlite3)

target_link_libraries(venus-desktop
        PRIVATE Qt6::Core Qt6::Gui Qt6::Qml Qt6::QmlModels Qt6::Quick Qt6::QuickControls2 Qt6::Sql sqlite3)
