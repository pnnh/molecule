set(PROJECT_SOURCES main.cpp utils.h utils.cpp)

add_executable(triangle ${PROJECT_SOURCES})
target_link_libraries(triangle ${OPENGL_LIBRARIES} glfw GLEW::GLEW)