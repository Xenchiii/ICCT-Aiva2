#ifndef HARDWARE_API_H
#define HARDWARE_API_H

#include <string>

class HardwareAPI {
public:
    void connect(const std::string& portName);
    std::string readData();
    void disconnect();
};

#endif