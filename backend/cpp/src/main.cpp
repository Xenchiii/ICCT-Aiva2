#include <iostream>
#include <vector>
#include <thread> // For sleep
#include <chrono> // For time

#include "../include/hardware_api.h"
#include "../include/calculations.h"
#include "../include/performance_computing.h"

int main() {
    std::cout << "--- ICCT Aiva Hardware Module (SIMULATION) ---" << std::endl;

    // 1. Setup Mock Components
    HardwareAPI hw;
    Calculations calc;
    PerformanceComputing perf;

    hw.connect("COM3");

    // 2. Hardcoded Test Data
    std::vector<int> mockGrades = {85, 90, 88, 92, 95};

    // 3. Main Loop (Simulates the device running)
    for (int i = 0; i < 3; i++) {
        std::cout << "\n--- Cycle " << i + 1 << " ---" << std::endl;

        // Fake Read
        std::string rfid = hw.readData();
        std::cout << "Read RFID: " << rfid << std::endl;

        // Fake Calculation
        double gwa = calc.convertToGWA(95); // Hardcoded input 95
        std::cout << "Converted 95 to GWA: " << gwa << std::endl;

        // Fake Stats
        ClassStats stats = perf.calculateClassStats(mockGrades);
        std::cout << "Class Pass Rate: " << stats.passRate << "%" << std::endl;

        // Sleep for 1 second to look cool
        std::this_thread::sleep_for(std::chrono::seconds(1));
    }

    hw.disconnect();
    return 0;
}