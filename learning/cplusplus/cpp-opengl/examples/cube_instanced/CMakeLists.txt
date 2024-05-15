set(PROJECT_SOURCES main.cpp utils.h utils.cpp)

add_executable(cube_instanced ${PROJECT_SOURCES})
target_link_libraries(cube_instanced ${OPENGL_LIBRARIES} glfw GLEW::GLEW)