cmake_minimum_required(VERSION 3.10)

# Project Name
project(ICCT_Aiva_Backend)

# Specify C++ Standard (Modern C++17)
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED True)

# Include Directories (Where .h files are)
include_directories(include)

# Define Source Files (Where .cpp files are)
set(SOURCES
    src/main.cpp
    src/calculations.cpp
    src/hardware_api.cpp
    src/performance_computing.cpp
)

# Create Executable
add_executable(AivaBackend ${SOURCES})

# Output Message
message(STATUS "Build configuration ready for ICCT Aiva Backend")