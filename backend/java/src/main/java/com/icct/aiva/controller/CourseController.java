package com.icct.aiva.controller;

import com.icct.aiva.model.Course;
import com.icct.aiva.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/courses")
public class CourseController {

    @Autowired
    private CourseService courseService;

    // GET /api/courses
    // Spring automatically converts the List<Course> to JSON for you!
    @GetMapping
    public ResponseEntity<List<Course>> getAllCourses() {
        // Hardcoded student ID for demo purposes
        List<Course> courses = courseService.getStudentCourses("2023-01025"); 
        return ResponseEntity.ok(courses);
    }

    // POST /api/courses/enroll
    // @RequestBody automatically converts the incoming JSON to a Course object
    @PostMapping("/enroll")
    public ResponseEntity<?> enroll(@RequestBody Course request) {
        boolean success = courseService.enrollStudent(
            "2023-01025", 
            request.getCourseCode(), 
            request.getDescription()
        );
        
        if (success) {
            // Return a simple JSON success message
            return ResponseEntity.ok(Map.of("message", "Enrollment Successful"));
        } else {
            return ResponseEntity.badRequest().body(Map.of("message", "Enrollment Failed"));
        }
    }
}