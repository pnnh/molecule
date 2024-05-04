
add_library(foo)

target_sources(foo
  PUBLIC
    FILE_SET CXX_MODULES FILES
      foo.cxx
)

add_executable(hello main.cxx)
target_link_libraries(hello foo)