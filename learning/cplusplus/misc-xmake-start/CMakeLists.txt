cmake_minimum_required(VERSION 3.22)
project(Kepler C CXX)

set(CMAKE_C_STANDARD 17)
set(CMAKE_C_STANDARD_REQUIRED ON)
set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

set(CMAKE_VERBOSE_MAKEFILE ON)
set(CMAKE_INCLUDE_CURRENT_DIR ON)

#set(CMAKE_TOOLCHAIN_FILE=$ENV{HOME}/Packages/vcpkg/scripts/buildsystems/vcpkg.cmake)
include(/home/ubuntu/Packages/vcpkg/scripts/buildsystems/vcpkg.cmake)

#link_directories("/usr/local/lib")
#include_directories("/usr/local/include")

find_package(PkgConfig)

find_package(spdlog CONFIG REQUIRED)
if (spdlog_FOUND)
    message(STATUS "Found spdlog: ${spdlog_LIBRARIES}")
    INCLUDE_DIRECTORIES(${spdlog_INCLUDE_DIRS})
    LINK_LIBRARIES(${spdlog_LIBRARIES})
endif (spdlog_FOUND)

add_executable(kepler src/main.cpp)

target_link_libraries(kepler PRIVATE spdlog::spdlog)