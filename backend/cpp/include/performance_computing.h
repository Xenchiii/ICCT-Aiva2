#ifndef PERFORMANCE_COMPUTING_H
#define PERFORMANCE_COMPUTING_H

#include <vector>
#include "calculations.h" // Reuse the SubjectGrade struct

namespace Aiva {

    /**
     * Structure to hold result of a batch optimization task.
     */
    struct OptimizationResult {
        int itemsProcessed;
        double executionTimeMs;
        double averageScore;
        std::vector<std::string> flaggedIds; // IDs of at-risk students found
    };

    class PerformanceEngine {
    public:
        /**
         * Processes a massive list of student grades in parallel to find class averages.
         * Simulates a high-performance computing task.
         * @param allGrades A large vector of student grade collections
         * @return OptimizationResult Summary statistics
         */
        static OptimizationResult processBatchGrades(const std::vector<std::vector<SubjectGrade>>& allGrades);

        /**
         * Predicts future resource usage based on current system load.
         * Useful for the "System Health" part of your Admin Dashboard.
         * @param currentLoad CPU load percentage (0.0 - 1.0)
         * @param activeUsers Number of currently logged-in users
         * @return double Predicted load for the next hour
         */
        static double predictSystemLoad(double currentLoad, int activeUsers);

        /**
         * An algorithm to detect anomalies in data (e.g., cheating detection).
         * @param dataPoints A time-series of student activity scores
         * @return bool True if suspicious activity is detected
         */
        static bool detectAnomalies(const std::vector<double>& dataPoints);
    };

}

#endif // PERFORMANCE_COMPUTING_H