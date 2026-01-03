#include "../include/hardware_api.h"
#include <iostream>

void HardwareAPI::connect(const std::string& portName) {
    std::cout << "[HARDWARE] (Mock) Connected to " << portName << std::endl;
}

std::string HardwareAPI::readData() {
    // HARDCODED: Simulating a card scan every time this is called
    return "UID: A3-B4-C5-D6"; 
}

void HardwareAPI::disconnect() {
    std::cout << "[HARDWARE] (Mock) Disconnected." << std::endl;
}