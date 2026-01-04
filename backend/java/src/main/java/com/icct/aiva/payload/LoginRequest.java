package com.icct.aiva.payload;

public class LoginRequest {
    private String email;
    private String password;

    // Getters and Setters are required!
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}