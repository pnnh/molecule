set(PROJECT_SOURCES main.cpp utils.h utils.cpp)

add_executable(cube_multiple ${PROJECT_SOURCES})
target_link_libraries(cube_multiple ${OPENGL_LIBRARIES} glfw GLEW::GLEW)