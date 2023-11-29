cmake_minimum_required(VERSION 3.15)

project(polaris VERSION 0.1 LANGUAGES C CXX OBJC OBJCXX Swift)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)
set(CMAKE_INCLUDE_CURRENT_DIR ON)

include_directories(src)
include_directories(src/include)

add_subdirectory(src)