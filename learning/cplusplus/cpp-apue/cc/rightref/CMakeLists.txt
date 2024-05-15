#SET(CMAKE_CXX_FLAGS  "${CMAKE_CXX_FLAGS} -fno-elide-constructors") # 演示目的
add_executable(cc_rightref main.cc BigMemoryPool.cc)