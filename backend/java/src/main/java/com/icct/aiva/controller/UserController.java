package com.icct.aiva.controller;

import com.icct.aiva.model.User;
import com.icct.aiva.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserRepository userRepo;

    // 1. FIX: Removed 'new UserRepository()' because Spring creates it for us.
    // 2. FIX: Removed 'new Gson()' because Spring handles JSON automatically.

    // GET /api/user/profile?email=student@test.com
    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(@RequestParam String email) {
        Optional<User> user = userRepo.findByEmail(email);

        if (user.isPresent()) {
            // Automatically converts the User object to JSON
            return ResponseEntity.ok(user.get());
        } else {
            return ResponseEntity.badRequest().body("{\"error\": \"User not found\"}");
        }
    }
}