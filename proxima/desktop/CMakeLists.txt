cmake_minimum_required(VERSION 3.15)

project(multiverse VERSION 0.1 LANGUAGES CXX)

set(CMAKE_INCLUDE_CURRENT_DIR ON)

set(CMAKE_AUTOUIC ON)
set(CMAKE_AUTOMOC ON)
set(CMAKE_AUTORCC ON)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

set(CMAKE_INCLUDE_CURRENT_DIR ON)
include_directories(src)
include_directories(module)

find_package(Qt6 COMPONENTS Core Qml QmlModels Quick Gui QuickLayouts QuickControls2 Sql REQUIRED)

FILE(GLOB PROJECT_SOURCES src/main.cpp src/delegates/**.* src/providers/**.* src/services/**.*)
qt6_add_executable(multiverse
        MANUAL_FINALIZATION
        ${PROJECT_SOURCES})

target_link_libraries(multiverse
        PRIVATE Qt6::Core Qt6::Gui Qt6::Qml Qt6::QmlModels Qt6::Quick Qt6::QuickControls2 Qt6::Sql)

qt6_import_qml_plugins(multiverse)
qt_finalize_executable(multiverse)

FILE(GLOB RESOURCES assets/images/icons/**.*)
message(STATUS "RESOURCES: " ${RESOURCES})

qt6_add_qml_module(multiverse
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
