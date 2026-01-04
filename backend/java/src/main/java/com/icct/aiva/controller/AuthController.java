package com.icct.aiva.controller; // 1. FIX: Added Package Declaration

import com.icct.aiva.model.User;
import com.icct.aiva.payload.AuthResponse;
import com.icct.aiva.payload.LoginRequest;
import com.icct.aiva.payload.RegisterRequest;
import com.icct.aiva.repository.UserRepository;
import com.icct.aiva.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        // 2. FIX: Actually perform the authentication
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                request.getEmail(),
                request.getPassword()
            )
        );

        // Set the authentication in the context
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // 3. FIX: Generate the token (defines the 'token' variable you were missing)
        String token = tokenProvider.generateToken(authentication);
        
        // Get user details to return to frontend
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        User user = userRepository.findByEmail(userDetails.getUsername()).orElse(null);

        // 4. FIX: Return the response with the defined variables
        return ResponseEntity.ok(new AuthResponse(token, user));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        // Check if email already exists
        if(userRepository.existsByEmail(request.getEmail())) {
            return new ResponseEntity<>("Email is already taken!", HttpStatus.BAD_REQUEST);
        }

        // Create new user
        User user = new User();
        user.setName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole("student"); // Default role

        userRepository.save(user);

        return ResponseEntity.ok("User registered successfully");
    }
    
    @GetMapping("/me")
    // 5. FIX: Added imports for AuthenticationPrincipal and UserDetails
    public ResponseEntity<?> getCurrentUser(@org.springframework.security.core.annotation.AuthenticationPrincipal UserDetails userDetails) {
        User user = userRepository.findByEmail(userDetails.getUsername()).orElseThrow();
        return ResponseEntity.ok(user);
    }
}