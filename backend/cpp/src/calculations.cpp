#include "../include/calculations.h"
#include <cmath>
#include <algorithm>
#include <sstream>
#include <iomanip>

namespace Aiva {

    std::string getTransmutedGrade(double rawScore) {
        // Clamp score between 0 and 100
        double score = std::max(0.0, std::min(100.0, rawScore));

        if (score >= 98.0) return "1.00";
        if (score >= 95.0) return "1.25";
        if (score >= 92.0) return "1.50";
        if (score >= 89.0) return "1.75";
        if (score >= 86.0) return "2.00";
        if (score >= 83.0) return "2.25";
        if (score >= 80.0) return "2.50";
        if (score >= 75.0) return "3.00"; // Passing Cutoff
        
        return "5.00"; // Failed
    }

    double calculateGWA(const std::vector<SubjectGrade>& subjects) {
        if (subjects.empty()) return 0.0;

        double totalUnits = 0.0;
        double weightedSum = 0.0;

        for (const auto& subject : subjects) {
            totalUnits += subject.units;
            weightedSum += (subject.units * subject.grade);
        }

        if (totalUnits == 0.0) return 0.0;

        return weightedSum / totalUnits;
    }

    double computeFinalRawScore(double quizScore, double examScore, double projectScore) {
        const double WEIGHT_QUIZ = 0.30;
        const double WEIGHT_EXAM = 0.40;
        const double WEIGHT_PROJECT = 0.30;

        return (quizScore * WEIGHT_QUIZ) + 
               (examScore * WEIGHT_EXAM) + 
               (projectScore * WEIGHT_PROJECT);
    }

    std::string getRemarks(double grade) {
        if (grade <= 3.00 && grade >= 1.00) {
            return "PASSED";
        }
        return "FAILED";
    }

}