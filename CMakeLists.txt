cmake_minimum_required(VERSION 3.27)

set(LANGUAGES C CXX CSharp)

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