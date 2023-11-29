cmake_minimum_required(VERSION 3.15)

project(venus VERSION 0.1 LANGUAGES C CXX)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

set(CMAKE_INCLUDE_CURRENT_DIR ON)
include_directories(src)

add_subdirectory(third_party/sqlite3)
add_subdirectory(src)