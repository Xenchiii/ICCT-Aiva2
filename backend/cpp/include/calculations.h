#ifndef CALCULATIONS_H
#define CALCULATIONS_H

#include <vector>

class Calculations {
public:
    double computeAverage(const std::vector<int>& grades);
    double convertToGWA(double rawScore);
    bool isPassing(double gwa);
};

#endif