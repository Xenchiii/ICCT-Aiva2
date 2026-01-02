#include <iostream>
#include <vector>
#include <thread>
#include <chrono>
#include "../include/calculations.h"
#include "../include/hardware_api.h"
#include "../include/performance_computing.h"

using namespace Aiva;

int main() {
    std::cout << "=== ICCT AIVA C++ BACKEND MODULE ===" << std::endl;

    // 1. TEST CALCULATIONS
    std::cout << "\n[TEST] Grading Logic:" << std::endl;
    double rawScore = 88.5;
    std::string grade = getTransmutedGrade(rawScore);
    std::cout << "Score: " << rawScore << " -> Transmuted: " << grade << " (" << getRemarks(std::stod(grade)) << ")" << std::endl;

    // 2. TEST HARDWARE API
    std::cout << "\n[TEST] Hardware Interface:" << std::endl;
    if (HardwareInterface::connect("COM3")) {
        HardwareInterface::sendCommand("SERVO_UNLOCK");
        
        // Simulate waiting for a card scan
        std::cout << "Waiting for RFID scan..." << std::endl;
        SensorData scan = HardwareInterface::readSensor();
        std::cout << "Read Data: " << scan.rawPayload << " from " << scan.deviceId << std::endl;
        
        HardwareInterface::disconnect();
    }

    // 3. TEST PERFORMANCE ENGINE
    std::cout << "\n[TEST] Analytics Engine:" << std::endl;
    // Create fake data for 1000 students
    std::vector<std::vector<SubjectGrade>> batchData;
    for(int i=0; i<1000; i++) {
        std::vector<SubjectGrade> student = {
            {"IT302", 3.0, (rand() % 500) / 100.0}, // Random grade 0.0 - 5.0
            {"CS101", 3.0, 1.25}
        };
        batchData.push_back(student);
    }

    OptimizationResult res = PerformanceEngine::processBatchGrades(batchData);
    std::cout << "Processed " << res.itemsProcessed << " records in " << res.executionTimeMs << "ms." << std::endl;
    std::cout << "Class Average: " << res.averageScore << std::endl;
    std::cout << "Students Flagged At-Risk: " << res.flaggedIds.size() << std::endl;

    return 0;
}