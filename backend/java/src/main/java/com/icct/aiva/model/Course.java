package com.icctaiva.model;

public class Course {
    private String courseCode; // e.g., "IT 302"
    private String description; // e.g., "Web Development"
    private int units;
    private String schedule; // e.g., "MWF 10:00-11:00"
    private String instructor;

    public Course(String courseCode, String description, int units, String schedule, String instructor) {
        this.courseCode = courseCode;
        this.description = description;
        this.units = units;
        this.schedule = schedule;
        this.instructor = instructor;
    }

    // Getters and Setters
    public String getCourseCode() { return courseCode; }
    public void setCourseCode(String courseCode) { this.courseCode = courseCode; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public int getUnits() { return units; }
    public void setUnits(int units) { this.units = units; }
    
    public String getSchedule() { return schedule; }
    public void setSchedule(String schedule) { this.schedule = schedule; }

    public String getInstructor() { return instructor; }
    public void setInstructor(String instructor) { this.instructor = instructor; }
}