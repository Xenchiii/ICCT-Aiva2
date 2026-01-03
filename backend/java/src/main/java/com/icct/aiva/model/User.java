package com.icctaiva.model;

public class User {
    private String id;
    private String studentId; // e.g., "2023-01025"
    private String fullName;
    private String email;
    private String password;
    private String role; // "Student", "Professor", "Admin"
    private String program; // e.g., "BSIT"

    // Constructor
    public User(String id, String studentId, String fullName, String email, String password, String role, String program) {
        this.id = id;
        this.studentId = studentId;
        this.fullName = fullName;
        this.email = email;
        this.password = password;
        this.role = role;
        this.program = program;
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getStudentId() { return studentId; }
    public void setStudentId(String studentId) { this.studentId = studentId; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
    
    public String getProgram() { return program; }
    public void setProgram(String program) { this.program = program; }

    @Override
    public String toString() {
        return "User{" +
                "name='" + fullName + '\'' +
                ", role='" + role + '\'' +
                '}';
    }
}