find_package(Boost COMPONENTS system thread random REQUIRED)

add_executable(boost_strand main.cc)

target_include_directories(boost_strand PRIVATE ${Boost_INCLUDE_DIRS})
target_link_libraries(boost_strand PRIVATE ${Boost_LIBRARIES})

add_executable(boost_work_timer timer.cc)
target_include_directories(boost_work_timer PRIVATE ${Boost_INCLUDE_DIRS})
target_link_libraries(boost_work_timer PRIVATE ${Boost_LIBRARIES})

add_executable(boost_work_recurring_timer recurring_timer.cc)
target_include_directories(boost_work_recurring_timer PRIVATE ${Boost_INCLUDE_DIRS})
target_link_libraries(boost_work_recurring_timer PRIVATE ${Boost_LIBRARIES})