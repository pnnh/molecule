cmake_minimum_required(VERSION 3.15)

project(qtempty VERSION 0.1 LANGUAGES CXX)

set(CMAKE_INCLUDE_CURRENT_DIR ON)

set(CMAKE_AUTOUIC ON)
set(CMAKE_AUTOMOC ON)
set(CMAKE_AUTORCC ON)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

find_package(Qt6 COMPONENTS Core Quick REQUIRED)

set(PROJECT_SOURCES
        main.cpp
        voronoi.cpp
        qml.qrc)

qt_add_executable(qtempty
        MANUAL_FINALIZATION
        ${PROJECT_SOURCES})

#target_compile_definitions(qtempty
#        PRIVATE $<$<OR:$<CONFIG:Debug>,$<CONFIG:RelWithDebInfo>>:QT_QML_DEBUG>)

target_link_libraries(qtempty
        PRIVATE Qt${QT_VERSION_MAJOR}::Core Qt${QT_VERSION_MAJOR}::Quick)

#set_target_properties(qtempty PROPERTIES
#        MACOSX_BUNDLE_GUI_IDENTIFIER sfx.xyz
#        MACOSX_BUNDLE_BUNDLE_VERSION ${PROJECT_VERSION}
#        MACOSX_BUNDLE_SHORT_VERSION_STRING ${PROJECT_VERSION_MAJOR}.${PROJECT_VERSION_MINOR})

qt_import_qml_plugins(qtempty)
qt_finalize_executable(qtempty)
