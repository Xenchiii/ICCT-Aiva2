#ifndef CALCULATIONS_H
#define CALCULATIONS_H

#include <string>
#include <vector>

namespace Aiva {

    // 1. DEFINE THE MISSING STRUCT
    // This tells C++ what a "SubjectGrade" actually is.
    struct SubjectGrade {
        std::string subjectCode; // e.g., "IT 302"
        double units;            // e.g., 3.0
        double grade;            // e.g., 1.25
    };

    // 2. DECLARE FUNCTION PROTOTYPES
    // These tell other files "These functions exist, go look for them in the .cpp file"
    
    std::string getTransmutedGrade(double rawScore);
    
    double calculateGWA(const std::vector<SubjectGrade>& subjects);
    
    double computeFinalRawScore(double quizScore, double examScore, double projectScore);
    
    std::string getRemarks(double grade);

}

#endif // CALCULATIONS_H