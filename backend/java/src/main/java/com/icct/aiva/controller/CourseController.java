package com.icct.aiva.controller;

// FIX: Updated imports to match your folder structure (added dot between icct and aiva)
import com.icct.aiva.service.CourseService;
import com.icct.aiva.model.Course;

// FIX: Make sure you have the Gson library added to your project dependencies
import com.google.gson.Gson; 
import java.util.List;

public class CourseController {

    private CourseService courseService;
    private Gson gson;

    public CourseController() {
        this.courseService = new CourseService();
        this.gson = new Gson();
    }

    // GET /api/courses
    public String getAllCourses() {
        // Hardcoded student ID for demo purposes
        List<Course> courses = courseService.getStudentCourses("2023-01025"); 
        return gson.toJson(courses);
    }

    // POST /api/courses/enroll
    public String enroll(String requestBody) {
        Course request = gson.fromJson(requestBody, Course.class);
        boolean success = courseService.enrollStudent("2023-01025", request.getCourseCode(), request.getDescription());
        
        return success ? "{\"message\": \"Enrollment Successful\"}" : "{\"message\": \"Enrollment Failed\"}";
    }
}