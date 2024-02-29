cmake_minimum_required(VERSION 3.10)

project(quantum_native VERSION 0.0.1 LANGUAGES C CXX)

# 设置语言标准
set(CMAKE_C_STANDARD 17)
set(CMAKE_C_STANDARD_REQUIRED ON)
set(CMAKE_CXX_STANDARD 23)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
# 设置开启显示详细的构建过程
set(CMAKE_VERBOSE_MAKEFILE ON)
# 设置生成clangd compile_commands.json文件，方便开发过程
set(CMAKE_EXPORT_COMPILE_COMMANDS ON)

add_library(quantum_native SHARED
        quantum.cc
        quantum.h
        quantum.def
)

# 查找并引用sqlite3
find_package(unofficial-sqlite3 CONFIG REQUIRED)
target_link_libraries(quantum_native PRIVATE unofficial::sqlite3::sqlite3)

# 查找并引用日志库
find_package(spdlog CONFIG REQUIRED)
target_link_libraries(quantum_native PRIVATE spdlog::spdlog)

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
endif ()

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

add_executable(main main.cc)
add_dependencies(main quantum_native)
target_link_libraries(main quantum_native)