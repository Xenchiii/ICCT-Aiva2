#include "../include/performance_computing.h"
#include <numeric>   // Needed for calculating sums
#include <algorithm> // Needed for finding min/max

ClassStats PerformanceComputing::calculateClassStats(const std::vector<int>& grades) {
    ClassStats stats = {0.0, 0.0, 0, 0};
    
    if (grades.empty()) return stats;

    // 1. Calculate Average
    double sum = std::accumulate(grades.begin(), grades.end(), 0.0);
    stats.average = sum / grades.size();

    // 2. Find Highest and Lowest
    auto minmax = std::minmax_element(grades.begin(), grades.end());
    stats.lowest = *minmax.first;
    stats.highest = *minmax.second;

    // 3. Calculate Pass Rate (Assuming 75 is the passing grade)
    int passingCount = 0;
    for(int g : grades) {
        if(g >= 75) passingCount++;
    }
    
    // Convert to percentage
    stats.passRate = (static_cast<double>(passingCount) / grades.size()) * 100.0;

    return stats;
}