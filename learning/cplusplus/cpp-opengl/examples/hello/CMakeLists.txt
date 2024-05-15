set(PROJECT_SOURCES main.cpp)

add_executable(hello ${PROJECT_SOURCES})
target_link_libraries(hello ${OPENGL_LIBRARIES} glfw GLEW::GLEW)