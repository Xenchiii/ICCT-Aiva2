#include "../include/performance_computing.h"
#include <iostream>
#include <numeric>
#include <cmath>

namespace Aiva {

    OptimizationResult PerformanceEngine::processBatchGrades(const std::vector<std::vector<SubjectGrade>>& allGrades) {
        OptimizationResult result;
        result.itemsProcessed = 0;
        double totalSum = 0.0;
        int gradeCount = 0;

        // Mock timer start
        clock_t start = clock();

        for (const auto& studentGrades : allGrades) {
            result.itemsProcessed++;
            
            // Check for failing grades to flag student
            double studentSum = 0;
            for (const auto& subj : studentGrades) {
                studentSum += subj.grade;
                if (subj.grade > 3.00) { // Failed
                    // In a real app, we'd have the student ID here. 
                    // Pushing a dummy ID for demo.
                    result.flaggedIds.push_back("FLAGGED_STUDENT_" + std::to_string(result.itemsProcessed));
                    break; // Flag once per student
                }
            }
            
            if (!studentGrades.empty()) {
                totalSum += (studentSum / studentGrades.size());
                gradeCount++;
            }
        }

        clock_t end = clock();
        result.executionTimeMs = double(end - start) / CLOCKS_PER_SEC * 1000;
        result.averageScore = (gradeCount > 0) ? (totalSum / gradeCount) : 0.0;

        return result;
    }

    double PerformanceEngine::predictSystemLoad(double currentLoad, int activeUsers) {
        // Simple linear prediction algorithm mock
        // Base load + (0.05% per user)
        return currentLoad + (activeUsers * 0.0005);
    }

    bool PerformanceEngine::detectAnomalies(const std::vector<double>& dataPoints) {
        if (dataPoints.empty()) return false;

        // Simple algorithm: Flag if standard deviation is too high
        double sum = std::accumulate(dataPoints.begin(), dataPoints.end(), 0.0);
        double mean = sum / dataPoints.size();
        
        double sq_sum = std::inner_product(dataPoints.begin(), dataPoints.end(), dataPoints.begin(), 0.0);
        double stdev = std::sqrt(sq_sum / dataPoints.size() - mean * mean);

        return stdev > 2.5; // Arbitrary threshold for "Anomaly"
    }

}