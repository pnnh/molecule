cmake_minimum_required(VERSION 3.15)

project(qt-wasm VERSION 0.1 LANGUAGES CXX)

set(CMAKE_VERBOSE_MAKEFILE ON)
set(CMAKE_INCLUDE_CURRENT_DIR ON)

set(CMAKE_AUTOUIC ON)
set(CMAKE_AUTOMOC ON)
set(CMAKE_AUTORCC ON)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

find_package(Qt6 COMPONENTS Core Gui Quick REQUIRED)

qt_policy(
        SET QTP0001 NEW
)

set(PROJECT_SOURCES
        main.cpp)

qt_add_executable(qt-wasm
        MANUAL_FINALIZATION
        ${PROJECT_SOURCES})

target_link_libraries(qt-wasm
        PRIVATE Qt6::Core Qt6::Gui Qt6::Quick)

# 当编译WebAssembly时修改链接参数，否则会报初始内存太小错误
if(EMSCRIPTEN)
    target_link_options(qt-wasm PRIVATE -s TOTAL_MEMORY=32MB)
endif()

qt_import_qml_plugins(qt-wasm)
qt_finalize_executable(qt-wasm)

qt_add_qml_module(qt-wasm
        URI qtwasm
        VERSION 1.0
        QML_FILES
        qrc/Main.qml qrc/App.qml
        RESOURCES
        qrc/ZhiMangXing-Regular.ttf)