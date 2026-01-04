package com.icct.aiva.service;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class AuthService {

    private static final String DB_URL = "jdbc:sqlite:backend/database.sqlite"; // Pointing to your D1/SQLite DB

    public boolean login(String email, String password) {
        String sql = "SELECT password FROM users WHERE email = ?";
        
        try (Connection conn = DriverManager.getConnection(DB_URL);
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            
            pstmt.setString(1, email);
            ResultSet rs = pstmt.executeQuery();
            
            if (rs.next()) {
                String storedPassword = rs.getString("password");
                // In a real app, use BCrypt.checkpw(password, storedPassword)
                return storedPassword.equals(password); 
            }
        } catch (SQLException e) {
            System.err.println("[AUTH ERROR] Database connection failed: " + e.getMessage());
        }
        return false;
    }

    public boolean register(String studentId, String name, String email, String password) {
        String sql = "INSERT INTO users(student_id, full_name, email, password, role) VALUES(?, ?, ?, ?, 'Student')";
        
        try (Connection conn = DriverManager.getConnection(DB_URL);
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            
            pstmt.setString(1, studentId);
            pstmt.setString(2, name);
            pstmt.setString(3, email);
            pstmt.setString(4, password); // Should be hashed
            pstmt.executeUpdate();
            return true;
            
        } catch (SQLException e) {
            System.err.println("[AUTH ERROR] Registration failed: " + e.getMessage());
            return false;
        }
    }
}