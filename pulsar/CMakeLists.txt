cmake_minimum_required(VERSION 3.27)

set(LANGUAGES C CXX)

if (APPLE)
        set(CMAKE_OSX_DEPLOYMENT_TARGET "10.15" CACHE STRING "Minimum OS X deployment version")
        set(CMAKE_OSX_ARCHITECTURES "x86_64;arm64" CACHE STRING "Build architectures for OS X")
        list(append LANGUAGES OBJC OBJCXX Swift)
endif ()

project(pulsar VERSION 0.1 LANGUAGES  ${LANGUAGES})

set(CMAKE_CXX_STANDARD 23)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_C_STANDARD 23)
set(CMAKE_C_STANDARD_REQUIRED ON)

set(CMAKE_INCLUDE_CURRENT_DIR ON)

#add_subdirectory(desktop)
add_subdirectory(web)