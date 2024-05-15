cmake_minimum_required(VERSION 3.27)

project(hello LANGUAGES Swift)

add_executable(hello main.swift ContentView.swift AppDelegate.swift)

#target_compile_options(hello PUBLIC -parse-as-library)