#ifndef PERFORMANCE_COMPUTING_H
#define PERFORMANCE_COMPUTING_H

#include <vector>

// Define the stats structure so main.cpp knows what 'ClassStats' is
struct ClassStats {
    double passRate;
    double average;
    int highest;
    int lowest;
};

// Define the class so main.cpp knows what 'PerformanceComputing' is
class PerformanceComputing {
public:
    ClassStats calculateClassStats(const std::vector<int>& grades);
};

#endif // PERFORMANCE_COMPUTING_H