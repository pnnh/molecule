cmake_minimum_required(VERSION 3.19) # Lower versions should also be supported
project(cpp20-modules)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)


# Add target to build iostream module
add_custom_target(std_modules ALL
        COMMAND ${CMAKE_COMMAND} -E echo "Building standard library modules"
        COMMAND  g++-12 -fmodules-ts -std=c++20 -c -x c++-system-header iostream
        WORKING_DIRECTORY ${CMAKE_BINARY_DIR}
        )

# Function to set up modules in GCC
#function (prepare_for_module TGT)
#    target_compile_options(${TGT} PUBLIC -fmodules-ts)
#    set_property(TARGET ${TGT} PROPERTY CXX_STANDARD 20)
#    set_property(TARGET ${TGT} PROPERTY CXX_EXTENSIONS OFF)
#    add_dependencies(${TGT} std_modules)
#endfunction()

add_compile_options(-fmodules-ts)
# Program name and sources
set (TARGET prog)
set (SOURCES mymod.cpp main.cpp)
#set (MODULES mymod.cpp)

# Setup program modules object library
#set (MODULE_TARGET prog-modules)
add_library(prog-modules OBJECT mymod.cpp)
set_property(TARGET prog-modules  PROPERTY CXX_EXTENSIONS OFF)
add_dependencies(prog-modules std_modules)
#add_dependencies(${TGT} std_modules)
#prepare_for_module(${MODULE_TARGET})

# Setup executable
add_executable(${TARGET} ${SOURCES})
add_dependencies(${TARGET} prog-modules)
#prepare_for_module(${TARGET})

# Add modules to application using object library
#target_link_libraries(${TARGET} PRIVATE ${MODULE_TARGET})