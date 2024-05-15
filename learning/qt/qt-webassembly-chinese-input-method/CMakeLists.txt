cmake_minimum_required(VERSION 3.15)

project(myapp VERSION 0.1 LANGUAGES C CXX)

set(CMAKE_VERBOSE_MAKEFILE ON)
set(CMAKE_INCLUDE_CURRENT_DIR ON)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

set(CMAKE_VERBOSE_MAKEFILE ON)

set(CMAKE_AUTOUIC ON)
set(CMAKE_AUTOMOC ON)
set(CMAKE_AUTORCC ON)

find_package(Qt6 COMPONENTS Core Gui Quick QuickLayouts QuickControls2 REQUIRED)

qt_policy(
        SET QTP0001 NEW
)

qt_add_executable(myapp
        main.cpp
        wasm.h wasm.cpp)

target_link_libraries(myapp
        PRIVATE Qt6::Core Qt6::Gui Qt6::Quick Qt6::QuickControls2)
set_target_properties(myapp PROPERTIES LINK_FLAGS "-lembind")

# 当编译WebAssembly时修改链接参数，否则会报初始内存太小错误
if (EMSCRIPTEN)
    set(QT_WASM_INITIAL_MEMORY 256MB)
    set(QT_WASM_TOTAL_MEMORY 256MB)
    #target_link_options(myapp PRIVATE "-s TOTAL_MEMORY=256MB")
endif ()

#qt_import_qml_plugins(myapp)
#qt_finalize_executable(myapp)

qt6_add_qml_module(myapp
        URI mymod
        VERSION 1.0
        SOURCES
        TextBalloon.h TextBalloon.cpp
        QML_FILES
        main.qml
        RESOURCES
        assets/fonts/NotoSansSC/NotoSansSC-Regular.otf)