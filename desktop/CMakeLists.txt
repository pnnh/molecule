cmake_minimum_required(VERSION 3.27)

project(polaris-desktop VERSION 0.1 LANGUAGES C CXX)

if (APPLE)
        enable_language(OBJC OBJCXX Swift)
endif ()

# 设置语言标准
set(CMAKE_CXX_STANDARD 23)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
if (WIN32)
        set(CMAKE_C_STANDARD 17)
else()
        set(CMAKE_C_STANDARD 23)
endif()
set(CMAKE_C_STANDARD_REQUIRED ON)

# 设置开启显示详细的构建过程
set(CMAKE_VERBOSE_MAKEFILE ON)

# 启用测试
enable_testing()

if (APPLE OR UNIX)
    find_package(PkgConfig REQUIRED)
endif()

# 查找并设置ccache
find_program(CCACHE_PROGRAM ccache)
if (CCACHE_PROGRAM)
    message(STATUS "Found ccache: ${CCACHE_PROGRAM}")
    set_property(GLOBAL PROPERTY RULE_LAUNCH_COMPILE "${CCACHE_PROGRAM}")
endif ()

# Clang-Tidy配置
find_program(CLANG_TIDY_BIN NAMES "clang-tidy")
if(CLANG_TIDY_BIN)
    message(STATUS "Found clang-tidy: ${CLANG_TIDY_BIN}")
  set(CMAKE_CXX_CLANG_TIDY "${CLANG_TIDY_BIN}" "-checks=*, -cppcoreguidelines-*, -modernize-*, -readability-*")
endif()

# 设置生成clangd compile_commands.json文件，方便和IDE集成
set(CMAKE_EXPORT_COMPILE_COMMANDS ON)

include_directories(${CMAKE_CURRENT_SOURCE_DIR})

set(CMAKE_AUTOUIC ON)
set(CMAKE_AUTOMOC ON)
set(CMAKE_AUTORCC ON)

find_package(Qt6 COMPONENTS Core Qml Quick Gui QuickControls2 Sql Widgets REQUIRED)

qt_policy(SET QTP0001 NEW)

set(PROJECT_SOURCES
        main.cpp
        models/AppException.cpp
        models/AppException.h
        sqlite/sqlite.cc
        sqlite/sqlite.h
        services/SqliteService.cpp
        services/SqliteService.h
)

set(LINK_LIBRARIES
        Qt6::Core
        Qt6::Qml
        Qt6::Quick
        Qt6::Gui
        Qt6::QuickControls2
        Qt6::Sql
        Qt6::Widgets)

if (APPLE)
        list(APPEND LINK_LIBRARIES "-framework AppKit")
        list(APPEND PROJECT_SOURCES 
                platform/macos/macwindow.h
                platform/macos/macwindow.mm
                platform/macos/objc_code.mm
                platform/macos/objc_code.h
                platform/macos/WindowController.mm
                platform/macos/WindowController.h)
endif()

qt6_add_executable(polaris-desktop MANUAL_FINALIZATION ${PROJECT_SOURCES})
target_link_libraries(polaris-desktop PRIVATE ${LINK_LIBRARIES})

# 查找并引用日志库
find_package(spdlog CONFIG REQUIRED)
target_link_libraries(polaris-desktop PRIVATE spdlog::spdlog)

# 查找并引用Markdown解析库
find_package(cmark CONFIG REQUIRED)
target_link_libraries(polaris-desktop PRIVATE cmark::cmark)

# 查找并引用Sqlite解析库
find_package(unofficial-sqlite3 CONFIG REQUIRED)
target_link_libraries(polaris-desktop PRIVATE unofficial::sqlite3::sqlite3)

include_directories(${CMAKE_CURRENT_SOURCE_DIR}/content/sources)

qt6_add_qml_module(polaris-desktop
        URI quick
        VERSION 1.0
        QML_FILES
        content/Main.qml
        content/list_videos.qml
        content/App.qml
        content/Topbar.qml
        content/FxScrollBar.qml
        content/TaskList.qml
        content/NavList.qml
        content/polaris/Editor.qml
        content/polaris/Sidebar.qml
        content/polaris/LibraryItem.qml
        RESOURCES
        content/assets/images/flag-fill.png
        content/assets/images/files.svg
        content/assets/material/symbols/web/description/description_48px.svg
        content/assets/material/symbols/web/description/description_fill1_48px.svg
        content/assets/material/symbols/web/keyboard_arrow_down/keyboard_arrow_down_48px.svg
        content/assets/material/symbols/web/keyboard_arrow_down/keyboard_arrow_down_fill1_48px.svg
        SOURCES 
        content/sources/markdown.h
        content/sources/markdown.cpp)
