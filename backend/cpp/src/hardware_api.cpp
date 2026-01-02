#include "../include/hardware_api.h"
#include <iostream>
#include <ctime>
#include <cstdlib>

namespace Aiva {

    // Mock state to track connection
    static DeviceStatus currentStatus = DeviceStatus::DISCONNECTED;

    bool HardwareInterface::connect(const std::string& port) {
        std::cout << "[HARDWARE] Attempting connection to " << port << "..." << std::endl;
        // Simulate a delay or handshake here
        currentStatus = DeviceStatus::CONNECTED;
        std::cout << "[HARDWARE] Connection Established." << std::endl;
        return true;
    }

    void HardwareInterface::disconnect() {
        if (currentStatus == DeviceStatus::CONNECTED) {
            std::cout << "[HARDWARE] Disconnecting device..." << std::endl;
            currentStatus = DeviceStatus::DISCONNECTED;
        }
    }

    SensorData HardwareInterface::readSensor() {
        SensorData data;
        
        if (currentStatus != DeviceStatus::CONNECTED) {
            std::cerr << "[HARDWARE] Error: No device connected." << std::endl;
            data.sensorType = "ERROR";
            return data;
        }

        // Generate Mock Data (e.g., simulating an RFID scan)
        data.deviceId = "ESP32-READER-01";
        data.sensorType = "RFID";
        data.value = 1.0; 
        data.rawPayload = "UID: A3-B4-C5-D6"; // Simulated Card ID
        data.timestamp = std::time(nullptr);

        return data;
    }

    bool HardwareInterface::sendCommand(const std::string& command) {
        if (currentStatus != DeviceStatus::CONNECTED) return false;
        
        std::cout << "[HARDWARE] Sending Command: " << command << std::endl;
        // Simulate servo reaction time
        return true;
    }

    DeviceStatus HardwareInterface::getStatus() {
        return currentStatus;
    }

}