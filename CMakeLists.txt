cmake_minimum_required(VERSION 3.27)

project(pulsar VERSION 0.1 LANGUAGES C CXX)

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

include_directories(${PROJECT_SOURCE_DIR})

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

add_subdirectory(pulsar/common)

if (EMSCRIPTEN)
        add_subdirectory(pulsar/web)
else()
        add_subdirectory(pulsar/native)
endif()

if (UNIX)
        add_subdirectory(pulsar/server)
endif()

if (WIN32)
        if(NOT DEFINED VCPKG_TARGET_TRIPLET)
                # 当前未采用VCPKG工具链，可以编译C#项目
                add_subdirectory(polaris-server)
        endif(NOT DEFINED VCPKG_TARGET_TRIPLET)
endif ()