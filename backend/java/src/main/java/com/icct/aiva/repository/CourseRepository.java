package com.icct.aiva.repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class CourseRepository {

    public static class Course {
        public String code; // e.g., IT 302
        public String name; // e.g., Web Development
        public int units;

        public Course(String code, String name, int units) {
            this.code = code;
            this.name = name;
            this.units = units;
        }
    }

    private static final List<Course> courseTable = new ArrayList<>();

    static {
        courseTable.add(new Course("IT 302", "Web Development", 3));
        courseTable.add(new Course("CS 201", "Data Structures", 3));
        courseTable.add(new Course("FIL 101", "Komunikasyon", 3));
        courseTable.add(new Course("PE 3", "Individual Sports", 2));
    }

    public List<Course> findAll() {
        System.out.println("[DB] Fetching all courses...");
        return new ArrayList<>(courseTable);
    }

    public Optional<Course> findByCode(String code) {
        return courseTable.stream()
                .filter(c -> c.code.equalsIgnoreCase(code))
                .findFirst();
    }
}