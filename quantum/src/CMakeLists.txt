cmake_minimum_required(VERSION 3.10)

project(quantum_native VERSION 0.0.1 LANGUAGES C CXX)

set(CMAKE_CXX_STANDARD 23)
set(CXX_STANDARD_REQUIRED)

add_library(quantum_native SHARED
        quantum.cc
        quantum.h
        quantum.def
)

if (APPLE)
    message("configure for Apple")
    set_target_properties(quantum_native PROPERTIES
            FRAMEWORK TRUE
            FRAMEWORK_VERSION A
            VERSION ${PROJECT_VERSION}
            SOVERSION 1
            PUBLIC_HEADER "quantum.h"
            OUTPUT_NAME "quantum_native"
            XCODE_ATTRIBUTE_CODE_SIGN_IDENTITY "iPhone Developer"
            MACOSX_BUNDLE TRUE)
endif()

set_target_properties(quantum_native PROPERTIES
        VERSION ${PROJECT_VERSION}
        SOVERSION 1
        PUBLIC_HEADER quantum.h
        OUTPUT_NAME "quantum_native")

target_compile_definitions(quantum_native PUBLIC DART_SHARED_LIB)

install(TARGETS quantum_native
        RUNTIME_DEPENDENCY_SET quantum_dependencies
        DESTINATION lib)
install(RUNTIME_DEPENDENCY_SET quantum_dependencies)

add_executable(main main.cc quantum.cc)