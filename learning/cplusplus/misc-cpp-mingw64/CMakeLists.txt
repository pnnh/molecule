cmake_minimum_required(VERSION 3.20)
project(mingw64)

set(CMAKE_CXX_STANDARD 11)

add_executable(mingw64 main.cpp)
target_link_libraries(mingw64 -static gcc stdc++ winpthread -dynamic)
