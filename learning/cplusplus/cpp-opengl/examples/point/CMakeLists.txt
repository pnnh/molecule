set(PROJECT_SOURCES main.cpp debug.h debug.cpp file.h file.cpp)

add_executable(point ${PROJECT_SOURCES})
target_link_libraries(point ${OPENGL_LIBRARIES} glfw GLEW::GLEW)