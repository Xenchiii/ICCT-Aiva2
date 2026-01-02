#ifndef CALCULATIONS_H
#define CALCULATIONS_H

#include <string>
#include <vector>

namespace Aiva {

    /**
     * Structure to hold subject data for GWA calculation.
     */
    struct SubjectGrade {
        std::string code;
        double units;
        double grade; // Transmuted grade (e.g., 1.25)
    };

    /**
     * Converts a raw score (0-100) into the ICCT standard grade (1.00 - 5.00).
     * @param rawScore The numeric score (e.g., 92.5)
     * @return std::string The grade as a string (e.g., "1.50")
     */
    std::string getTransmutedGrade(double rawScore);

    /**
     * Calculates the General Weighted Average (GWA).
     * Formula: Sum(Units * Grade) / Sum(Units)
     * @param subjects A vector of SubjectGrade structs
     * @return double The calculated GWA
     */
    double calculateGWA(const std::vector<SubjectGrade>& subjects);

    /**
     * Computes the final raw score based on weighted components.
     * Standard: 30% Quiz, 40% Exam, 30% Project
     * @return double The final raw score
     */
    double computeFinalRawScore(double quizScore, double examScore, double projectScore);

    /**
     * Determines if a student passed based on their grade.
     * @param grade The transmuted grade (e.g., 3.00)
     * @return std::string "PASSED" or "FAILED"
     */
    std::string getRemarks(double grade);

}

#endif // CALCULATIONS_H