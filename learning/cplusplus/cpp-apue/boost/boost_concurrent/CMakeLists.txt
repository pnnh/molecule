find_package(Boost COMPONENTS system thread chrono REQUIRED)

add_executable(boost_concurrent main.cc)
target_include_directories(boost_concurrent PRIVATE ${Boost_INCLUDE_DIRS})
target_link_libraries(boost_concurrent PRIVATE ${Boost_LIBRARIES})

add_executable(boost_io_service io_service.cc)
target_include_directories(boost_io_service PRIVATE ${Boost_INCLUDE_DIRS})
target_link_libraries(boost_io_service PRIVATE ${Boost_LIBRARIES})

add_executable(boost_bind bind.cc)
target_include_directories(boost_bind PRIVATE ${Boost_INCLUDE_DIRS})
target_link_libraries(boost_bind PRIVATE ${Boost_LIBRARIES})

add_executable(boost_io_service_bind io_service_bind.cc)
target_include_directories(boost_io_service_bind PRIVATE ${Boost_INCLUDE_DIRS})
target_link_libraries(boost_io_service_bind PRIVATE ${Boost_LIBRARIES})

add_executable(boost_io_service_post io_service_post.cc)
target_include_directories(boost_io_service_post PRIVATE ${Boost_INCLUDE_DIRS})
target_link_libraries(boost_io_service_post PRIVATE ${Boost_LIBRARIES})

add_executable(boost_io_service_dispatch io_service_dispatch.cc)
target_include_directories(boost_io_service_dispatch PRIVATE ${Boost_INCLUDE_DIRS})
target_link_libraries(boost_io_service_dispatch PRIVATE ${Boost_LIBRARIES})


