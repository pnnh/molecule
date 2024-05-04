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
else ()
    set(CMAKE_C_STANDARD 23)
endif ()
set(CMAKE_C_STANDARD_REQUIRED ON)

# 设置开启显示详细的构建过程
set(CMAKE_VERBOSE_MAKEFILE ON)

# 启用测试
enable_testing()

if (APPLE OR UNIX)
    find_package(PkgConfig REQUIRED)
endif ()

# 查找并设置ccache
find_program(CCACHE_PROGRAM ccache)
if (CCACHE_PROGRAM)
    message(STATUS "Found ccache: ${CCACHE_PROGRAM}")
    set_property(GLOBAL PROPERTY RULE_LAUNCH_COMPILE "${CCACHE_PROGRAM}")
endif ()

# 设置生成clangd compile_commands.json文件，方便和IDE集成
set(CMAKE_EXPORT_COMPILE_COMMANDS ON)

# Clang-Tidy配置
find_program(CLANG_TIDY_BIN NAMES "clang-tidy")
if (CLANG_TIDY_BIN)
    message(STATUS "Found clang-tidy: ${CLANG_TIDY_BIN}")
    set(CMAKE_CXX_CLANG_TIDY "${CLANG_TIDY_BIN}" "-checks=*, -cppcoreguidelines-*, -modernize-*, -readability-*")
endif ()

include_directories(${CMAKE_CURRENT_SOURCE_DIR})

set(CMAKE_AUTOUIC ON)
set(CMAKE_AUTOMOC ON)
set(CMAKE_AUTORCC ON)

# 查找并引用Qt库
find_package(Qt6 COMPONENTS Core Qml Quick Gui QuickControls2 Sql Widgets REQUIRED)

qt_policy(SET QTP0001 NEW)

if (APPLE)
    list(APPEND APPLICATION_LIBRARIES "-framework AppKit")
    list(APPEND APPLICATION_SOURCES
            platform/macos/macwindow.h
            platform/macos/macwindow.mm
            platform/macos/objc_code.mm
            platform/macos/objc_code.h
            platform/macos/WindowController.mm
            platform/macos/WindowController.h)
endif ()

qt6_add_executable(polaris-desktop MANUAL_FINALIZATION
        main.cpp
        models/AppException.cpp
        models/AppException.h
        services/sqlite_service.cpp
        services/sqlite_service.h
        services/markdown_service.cpp
        services/markdown_service.h
        tests/tests.h
        tests/tests.cpp)

# 查找并引用日志库
find_package(spdlog CONFIG REQUIRED)
target_link_libraries(polaris-desktop PRIVATE spdlog::spdlog)

# 查找并引用Markdown解析库
find_package(cmark CONFIG REQUIRED)
target_link_libraries(polaris-desktop PRIVATE cmark::cmark)

# 查找并引用Sqlite解析库
find_package(unofficial-sqlite3 CONFIG REQUIRED)
target_link_libraries(polaris-desktop PRIVATE unofficial::sqlite3::sqlite3)

target_link_libraries(polaris-desktop PRIVATE
        Qt6::Core
        Qt6::Qml
        Qt6::Quick
        Qt6::Gui
        Qt6::QuickControls2
        Qt6::Sql
        Qt6::Widgets)

include_directories(${CMAKE_CURRENT_SOURCE_DIR}/content/sources)

qt6_add_qml_module(polaris-desktop
        URI quick
        VERSION 1.0
        RESOURCES
        content/assets/images/flag-fill.png
        content/assets/images/files.svg
        content/assets/material/symbols/web/description/description_48px.svg
        content/assets/material/symbols/web/description/description_fill1_48px.svg
        content/assets/material/symbols/web/keyboard_arrow_down/keyboard_arrow_down_48px.svg
        content/assets/material/symbols/web/keyboard_arrow_down/keyboard_arrow_down_fill1_48px.svg
        SOURCES
        content/sources/markdown.h
        content/sources/markdown.cpp
        content/sources/PartitionModel.h
        content/sources/PartitionModel.cpp
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
        content/polaris/PartitionItem.qml)

add_test(NAME polaris-desktop-case COMMAND polaris-desktop sqlite)
set_tests_properties(polaris-desktop-case PROPERTIES ENVIRONMENT PL_DSN=xyz)

add_test(NAME polaris-tests-markdown COMMAND polaris-desktop markdown)