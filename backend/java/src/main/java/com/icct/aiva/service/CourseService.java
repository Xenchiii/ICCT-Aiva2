package com.icctaiva.service;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class CourseService {

    private static final String DB_URL = "jdbc:sqlite:backend/database.sqlite";

    public static class Course {
        public String id;
        public String name;
        
        public Course(String id, String name) {
            this.id = id;
            this.name = name;
        }
    }

    public List<Course> getStudentCourses(String studentId) {
        List<Course> courses = new ArrayList<>();
        // Querying the 'grades' table since it links students to subjects in our schema
        String sql = "SELECT subject_code, subject_desc FROM grades WHERE student_id = ?";
        
        try (Connection conn = DriverManager.getConnection(DB_URL);
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            
            pstmt.setString(1, studentId);
            ResultSet rs = pstmt.executeQuery();
            
            while (rs.next()) {
                courses.add(new Course(
                    rs.getString("subject_code"),
                    rs.getString("subject_desc")
                ));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return courses;
    }

    public boolean enrollStudent(String studentId, String subjectCode, String description) {
        String sql = "INSERT INTO grades(student_id, subject_code, subject_desc) VALUES(?, ?, ?)";
        
        try (Connection conn = DriverManager.getConnection(DB_URL);
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            
            pstmt.setString(1, studentId);
            pstmt.setString(2, subjectCode);
            pstmt.setString(3, description);
            pstmt.executeUpdate();
            return true;
            
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }
}