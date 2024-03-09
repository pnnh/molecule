find_package(Boost COMPONENTS system thread REQUIRED)
INCLUDE_DIRECTORIES(${Boost_INCLUDE_DIRS})
LINK_LIBRARIES(${Boost_LIBRARIES})

find_package(msgpack-cxx REQUIRED)
INCLUDE_DIRECTORIES(${msgpack_INCLUDE_DIRS})
LINK_LIBRARIES(${msgpack_LIBRARIES})

add_executable(server main.cpp server.cpp server.h)
add_executable(client client.cpp)