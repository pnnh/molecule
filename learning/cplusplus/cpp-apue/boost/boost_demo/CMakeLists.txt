find_package(Boost COMPONENTS system thread random REQUIRED)

add_executable(boost_demo main.cc)

target_include_directories(boost_demo PRIVATE ${Boost_INCLUDE_DIRS})
target_link_libraries(boost_demo PRIVATE ${Boost_LIBRARIES})