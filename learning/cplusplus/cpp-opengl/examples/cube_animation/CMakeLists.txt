set(PROJECT_SOURCES main.cpp utils.h utils.cpp)

add_executable(cube_animation ${PROJECT_SOURCES})
target_link_libraries(cube_animation ${OPENGL_LIBRARIES} glfw GLEW::GLEW)