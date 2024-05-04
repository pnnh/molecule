
add_library(foo)

target_sources(foo
  PUBLIC
    FILE_SET CXX_MODULES FILES
      foo.ixx
)

add_executable(hello main.cxx)
target_link_libraries(hello foo)