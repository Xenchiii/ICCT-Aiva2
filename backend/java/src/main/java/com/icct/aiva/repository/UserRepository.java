package com.icctaiva.repository;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

public class UserRepository {

    // Mock Database Table: Key = Email, Value = User Object
    private static final Map<String, User> userTable = new HashMap<>();

    // Inner class to represent the User Model
    public static class User {
        public String id;
        public String email;
        public String password; // In real app, this is hashed
        public String role; // Student, Admin, Professor

        public User(String id, String email, String password, String role) {
            this.id = id;
            this.email = email;
            this.password = password;
            this.role = role;
        }
    }

    // Pre-populate with dummy data
    static {
        userTable.put("jame@icct.edu.ph", new User("2023-01", "jame@icct.edu.ph", "pass123", "Student"));
        userTable.put("prof@icct.edu.ph", new User("FAC-01", "prof@icct.edu.ph", "teach123", "Professor"));
        userTable.put("admin@icct.edu.ph", new User("ADM-01", "admin@icct.edu.ph", "admin123", "Admin"));
    }

    public Optional<User> findByEmail(String email) {
        System.out.println("[DB] Searching for user: " + email);
        return Optional.ofNullable(userTable.get(email));
    }

    public User save(User user) {
        userTable.put(user.email, user);
        System.out.println("[DB] User saved: " + user.email);
        return user;
    }

    public boolean existsByEmail(String email) {
        return userTable.containsKey(email);
    }
}