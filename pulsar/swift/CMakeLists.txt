# In CMakeLists.txt
# cmake_minimum_required(VERSION 3.18)

# project(CxxInterop LANGUAGES C CXX Swift)

# set(CMAKE_CXX_STANDARD 23)
# set(CMAKE_CXX_STANDARD_REQUIRED YES)
# set(CMAKE_CXX_EXTENSIONS OFF)

add_library(cxx-support SHARED
    ./Sources/CxxTest/CxxTest.cpp
    ./Sources/CxxTest/CxxTest.h
    ./Sources/CxxTest/module.modulemap)

target_compile_options(cxx-support PRIVATE
  -fno-exceptions
  -fignore-exceptions)

target_include_directories(cxx-support PUBLIC ${CMAKE_SOURCE_DIR}/Sources/CxxTest)

add_executable(CxxInterop ./Sources/CxxInterop/main.swift)
target_compile_options(CxxInterop PRIVATE "SHELL:-cxx-interoperability-mode=default")
target_link_libraries(CxxInterop PRIVATE cxx-support)