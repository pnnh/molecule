cmake_minimum_required(VERSION 3.27)

set(LANGUAGES C CXX)

if (WIN32)
        list(APPEND LANGUAGES CSharp)
        # set(CMAKE_DOTNET_TARGET_FRAMEWORK "net8.0")
        set(CMAKE_CSharp_FLAGS "${CMAKE_CSharp_FLAGS} /platform:x64 /langversion:latest")
endif ()

if (APPLE)
        list(append LANGUAGES OBJC OBJCXX Swift)
endif ()

project(pulsar VERSION 0.1 LANGUAGES  ${LANGUAGES})

set(CMAKE_CXX_STANDARD 23)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_C_STANDARD 23)
set(CMAKE_C_STANDARD_REQUIRED ON)

set(CMAKE_INCLUDE_CURRENT_DIR ON)

#add_subdirectory(desktop)
add_subdirectory(pulsar/web)
add_subdirectory(polaris-server)