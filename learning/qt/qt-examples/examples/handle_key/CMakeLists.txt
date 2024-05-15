cmake_minimum_required(VERSION 3.15)

project(qtempty VERSION 0.1 LANGUAGES CXX)

set(CMAKE_INCLUDE_CURRENT_DIR ON)

set(CMAKE_AUTOUIC ON)
set(CMAKE_AUTOMOC ON)
set(CMAKE_AUTORCC ON)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

find_package(Qt6 COMPONENTS Core Quick REQUIRED)

set(PROJECT_SOURCES
        main.cpp
        qml.qrc)

qt_add_executable(handle_key
        MANUAL_FINALIZATION
        ${PROJECT_SOURCES})

target_link_libraries(handle_key
        PRIVATE Qt${QT_VERSION_MAJOR}::Core Qt${QT_VERSION_MAJOR}::Quick)

qt_import_qml_plugins(handle_key)
qt_finalize_executable(handle_key)
