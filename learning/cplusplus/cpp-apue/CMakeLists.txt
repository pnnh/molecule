cmake_minimum_required(VERSION 3.20)
project(cpp-apue)

set(CMAKE_CXX_STANDARD 23)

set(CMAKE_VERBOSE_MAKEFILE on)

FILE(GLOB cc_examples RELATIVE ${CMAKE_SOURCE_DIR} ${CMAKE_SOURCE_DIR}/cc/*)
FOREACH (child ${cc_examples})
    ADD_SUBDIRECTORY(${child})
ENDFOREACH ()

FILE(GLOB boost_examples RELATIVE ${CMAKE_SOURCE_DIR} ${CMAKE_SOURCE_DIR}/boost/*)
FOREACH (child ${boost_examples})
    ADD_SUBDIRECTORY(${child})
ENDFOREACH ()

FILE(GLOB apue_examples RELATIVE ${CMAKE_SOURCE_DIR} ${CMAKE_SOURCE_DIR}/apue/*)
FOREACH (child ${apue_examples})
    ADD_SUBDIRECTORY(${child})
ENDFOREACH ()
