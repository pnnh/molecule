# In CMakeLists.txt
cmake_minimum_required(VERSION 3.18)

project(CxxInterop LANGUAGES C CXX OBJC OBJCXX Swift)

set(CMAKE_CXX_STANDARD 11)
set(CMAKE_CXX_STANDARD_REQUIRED YES)
set(CMAKE_CXX_EXTENSIONS OFF)

set(CMAKE_OSX_ARCHITECTURES "arm64;x86_64")
#set(CMAKE_SYSTEM_PROCESSOR "arm64;x86_64")
#set(CMAKE_OSX_DEPLOYMENT_TARGET "14.0")

add_library(cxx-support 
    ./Sources/CxxTest/CxxTest.cpp
    ./Sources/CxxTest/CxxTest.hpp
    ./Sources/CxxTest/objc_code.mm 
    ./Sources/CxxTest/objc_code.h)

target_compile_options(cxx-support PRIVATE
  -fno-exceptions
  -fignore-exceptions)
target_include_directories(cxx-support PUBLIC
  ${CMAKE_SOURCE_DIR}/Sources/CxxTest)

target_link_libraries(cxx-support "-framework Foundation")

add_executable(CxxInterop ./Sources/CxxInterop/main.swift)
target_compile_options(CxxInterop PRIVATE
  "SHELL:-cxx-interoperability-mode=default")
target_link_libraries(CxxInterop PRIVATE cxx-support)