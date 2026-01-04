package com.icct.aiva.service;

import com.icct.aiva.model.Course;
import java.util.List;
import java.util.ArrayList;

public class CourseService {
    
    public List<Course> getStudentCourses(String studentId) {
        System.out.println("[CourseService] Fetching courses for student: " + studentId);
        
        // Return empty list for now
        return new ArrayList<>();
    }
    
    public boolean enrollStudent(String studentId, String courseCode, String description) {
        
        System.out.println("[CourseService] Enrolling student " + studentId 
                         + " in course " + courseCode 
                         + " (" + description + ")");
        
        // Return true as placeholder (successful enrollment)
        return true;
    }
}