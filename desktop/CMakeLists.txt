cmake_minimum_required(VERSION 3.27)

project(polaris-desktop VERSION 0.1 LANGUAGES C CXX)

if (WIN32)
        enable_language(CSharp)
        set(CMAKE_CSharp_FLAGS "${CMAKE_CSharp_FLAGS} /platform:x64 /langversion:latest")
endif ()

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

include(GNUInstallDirs)

find_package(PkgConfig REQUIRED)

# 查找并设置ccache
find_program(CCACHE_PROGRAM ccache)
if (CCACHE_PROGRAM)
    set_property(GLOBAL PROPERTY RULE_LAUNCH_COMPILE "${CCACHE_PROGRAM}")
endif ()

# 设置生成clangd compile_commands.json文件，方便和IDE集成
set(CMAKE_EXPORT_COMPILE_COMMANDS ON)

include_directories(/opt/include)
include_directories(${CMAKE_CURRENT_SOURCE_DIR})

# if (EMSCRIPTEN)
#         add_subdirectory(pulsar/web)
# elseif(DEFINED VCPKG_TARGET_TRIPLET)
#         add_subdirectory(pulsar/native)
# endif()

if (UNIX)
        # add_subdirectory(pulsar/server)
        #add_subdirectory(pulsar/wetee)
endif()

if (WIN32)
        # if(NOT DEFINED VCPKG_TARGET_TRIPLET)
        #         # 当前未采用VCPKG工具链，可以编译C#项目
        #         add_subdirectory(polaris-server)
        # endif(NOT DEFINED VCPKG_TARGET_TRIPLET)
endif ()

set(CMAKE_AUTOUIC ON)
set(CMAKE_AUTOMOC ON)
set(CMAKE_AUTORCC ON)

find_package(Qt6 COMPONENTS Core Qml Quick Gui QuickControls2 Sql Widgets REQUIRED)

qt_policy(SET QTP0001 NEW)

set(PROJECT_SOURCES
        main.cpp
        models/videoListModel.cc
        models/videoListModel.h
        models/sqliteModel.cc
        models/sqliteModel.h
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
        Qt6::Widgets )

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
