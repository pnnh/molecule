set(PROJECT_SOURCES main.cpp utils.h utils.cpp)

add_executable(cube_pyramid ${PROJECT_SOURCES})
target_link_libraries(cube_pyramid ${OPENGL_LIBRARIES} glfw GLEW::GLEW)