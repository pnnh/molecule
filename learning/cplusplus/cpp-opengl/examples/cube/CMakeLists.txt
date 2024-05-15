set(PROJECT_SOURCES main.cpp utils.h utils.cpp)

add_executable(cube ${PROJECT_SOURCES})
target_link_libraries(cube ${OPENGL_LIBRARIES} glfw GLEW::GLEW)