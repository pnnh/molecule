add_executable(pulsar-server main.cpp)

target_include_directories(pulsar-server PRIVATE src)

# 查找Workflow库，实现HTTP服务
set(WORKFLOW_BUILD_STATIC_RUNTIME ON)
find_library(workflow_lib workflow)
target_link_libraries(pulsar-server PRIVATE ${workflow_lib})

# find_package(PkgConfig REQUIRED)
# find_package(ZLIB)

# # 查找并引用Boost库
# set(Boost_NO_WARN_NEW_VERSIONS 1)
# find_package(Boost COMPONENTS system thread REQUIRED)
# target_link_libraries(pulsar-server PRIVATE ${Boost_LIBRARIES})

# # 查找并引用folly库
# find_package(folly REQUIRED)
# target_link_libraries(pulsar-server PRIVATE ${FOLLY_LIBRARIES})

# # 查找并引用Postgresql库
# #find_package(PostgreSQL REQUIRED)
# #target_link_libraries(pulsar-server PRIVATE PostgreSQL::PostgreSQL)
# find_library(PQXX_LIB pqxx)
# # find_package(libpqxx REQUIRED)
# # target_link_libraries(pulsar-server PRIVATE libpqxx::pqxx)

# # 查找并链接Markdown解析库
# find_library(MultiMarkdown_LIB NAMES MultiMarkdown)
# target_link_libraries(pulsar-server PRIVATE ${MultiMarkdown_LIB})

# # 查找并引用日志库
find_package(spdlog CONFIG REQUIRED)
target_link_libraries(pulsar-server PRIVATE spdlog::spdlog)

# # 查找JSON库
# find_package(nlohmann_json CONFIG REQUIRED)
# target_link_libraries(pulsar-server PRIVATE nlohmann_json::nlohmann_json)

# # 查找并链接模板库
# # find_package(inja CONFIG REQUIRED)
# # target_link_libraries(pulsar-server PRIVATE pantor::inja)

# # 查找Qt库，使用部分特性
# find_package(Qt6 REQUIRED COMPONENTS Xml)
# target_link_libraries(pulsar-server PRIVATE Qt6::Xml)

# # 拷贝资源文件到二进制目录，方便调试
# # file(COPY assets DESTINATION ${CMAKE_BINARY_DIR})

# # 设置安装目标，及目标依赖库
# install(TARGETS pulsar-server
#         RUNTIME_DEPENDENCY_SET pulsar-server-dependencies)
# install(RUNTIME_DEPENDENCY_SET pulsar-server-dependencies)

# ADD_SUBDIRECTORY(server)
# add_subdirectory(oatpp)

