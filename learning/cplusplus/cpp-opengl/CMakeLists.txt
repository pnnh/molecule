cmake_minimum_required(VERSION 3.15)

project(cpp-opengl VERSION 0.1 LANGUAGES CXX)

set(CMAKE_INCLUDE_CURRENT_DIR ON)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)


find_package(glfw3 REQUIRED)
find_package(GLEW REQUIRED)

# find OpenGL
find_package(OpenGL REQUIRED)
include_directories(${OpenGL_INCLUDE_DIRS})
link_directories(${OpenGL_LIBRARY_DIRS})
add_definitions(${OpenGL_DEFINITIONS})

add_subdirectory(examples/hello)
add_subdirectory(examples/point)
add_subdirectory(examples/cube)
add_subdirectory(examples/cube_animation)
add_subdirectory(examples/cube_multiple)
add_subdirectory(examples/cube_instanced)
add_subdirectory(examples/cube_pyramid)
add_subdirectory(examples/triangle)
add_subdirectory(examples/matrix_stack)