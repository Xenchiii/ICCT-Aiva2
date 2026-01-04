package com.icct.aiva.controller;

import com.icct.aiva.model.User;
import com.icct.aiva.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/forum")
public class ForumController {

    @Autowired
    private UserRepository userRepo;

    // NOTE: In Spring Boot, we don't say "new UserRepository()". 
    // We let Spring give us the connection automatically using @Autowired.

    // GET /api/forum/user-profile
    @GetMapping("/user-profile")
    public ResponseEntity<?> getProfile(@RequestParam String email) {
        Optional<User> user = userRepo.findByEmail(email);

        if (user.isPresent()) {
            // Spring automatically converts the User object to JSON
            return ResponseEntity.ok(user.get());
        } else {
            return ResponseEntity.badRequest().body("{\"error\": \"User not found\"}");
        }
    }
    
    // You can add real Forum endpoints here later, like:
    // @PostMapping("/create-post") ...
}