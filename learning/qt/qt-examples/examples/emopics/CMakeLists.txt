cmake_minimum_required(VERSION 3.15)

project(emopics VERSION 0.1 LANGUAGES CXX)

set(CMAKE_INCLUDE_CURRENT_DIR ON)

set(CMAKE_AUTOUIC ON)
set(CMAKE_AUTOMOC ON)
set(CMAKE_AUTORCC ON)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

include_directories(src)

find_package(Qt6 COMPONENTS Core Gui REQUIRED)

set(PROJECT_SOURCES src/main.cpp src/helper.cpp src/helper.h)

qt_add_executable(emopics
        MANUAL_FINALIZATION
        ${PROJECT_SOURCES})

target_link_libraries(emopics
        PRIVATE Qt6::Core  Qt6::Gui)

