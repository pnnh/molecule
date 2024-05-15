cmake_minimum_required(VERSION 3.27)

project(openssl_version VERSION 0.1 LANGUAGES C CXX)

set(CMAKE_VERBOSE_MAKEFILE ON)

add_executable(openssl_version main.cc)

find_package(OpenSSL)

message(STATUS "OpenSSL_INCLUDE_DIR: ${OPENSSL_LIBRARIES}")
target_link_libraries(openssl_version PUBLIC  ${OPENSSL_LIBRARIES})