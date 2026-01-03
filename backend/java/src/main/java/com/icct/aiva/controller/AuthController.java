package com.icct.aiva.controller;

import com.icct.aiva.service.AuthService;
import com.icct.aiva.security.JwtTokenProvider;
import com.icct.aiva.model.User;
import com.google.gson.JsonSyntaxException;
import com.google.gson.Gson; // Assuming you use Gson for JSON

public class AuthController {

    private AuthService authService;
    private JwtTokenProvider tokenProvider;
    private Gson gson;

    public AuthController() {
        this.authService = new AuthService();
        this.tokenProvider = new JwtTokenProvider();
        this.gson = new Gson();
    }

    // POST /api/auth/login
    public String login(String requestBody) {
        try {
            User loginRequest = gson.fromJson(requestBody, User.class);

            if (loginRequest == null || loginRequest.getEmail() == null || loginRequest.getPassword() == null) {
                return gson.toJson(new AuthResponse(false, null, "Missing email or password"));
            }

            boolean authenticated = authService.login(loginRequest.getEmail(), loginRequest.getPassword());
            if (authenticated) {
                String token = tokenProvider.createToken(loginRequest.getEmail(), "Student");
                return gson.toJson(new AuthResponse(true, token, "Login Successful"));
            } else {
                return gson.toJson(new AuthResponse(false, null, "Invalid Credentials"));
            }
        } catch (JsonSyntaxException e) {
            return gson.toJson(new AuthResponse(false, null, "Invalid request payload"));
        } catch (Exception e) {
            return gson.toJson(new AuthResponse(false, null, "Server error"));
        }
    }

    // Helper Response Class
    static class AuthResponse {
        boolean success;
        String token;
        String message;

        public AuthResponse(boolean success, String token, String message) {
            this.success = success;
            this.token = token;
            this.message = message;
        }
    }
}