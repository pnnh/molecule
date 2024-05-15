set(PROJECT_SOURCES main.cpp utils.h utils.cpp)

add_executable(matrix_stack ${PROJECT_SOURCES})
target_link_libraries(matrix_stack ${OPENGL_LIBRARIES} glfw GLEW::GLEW)