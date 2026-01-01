cmake_minimum_required(VERSION 3.10)
project(icct_aiva_cpp)
add_executable(icct_aiva src/main.cpp src/performance_computing.cpp src/hardware_api.cpp src/calculations.cpp)
include_directories(include)
