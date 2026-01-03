package com.icctaiva.security;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class JwtTokenProvider {

    // Hardcoded "Secret Key" (In a real app, this would be a long random string in a config file)
    private final String SECRET_KEY = "icct_aiva_secret_key_2026";
    
    // Token validity: 1 hour (3600000 milliseconds)
    private final long VALIDITY_IN_MS = 3600000; 

    // Mock Database of active tokens to simulate state
    private static final Map<String, String> activeTokens = new HashMap<>();

    /**
     * Generates a fake JWT token for a given username/email.
     */
    public String createToken(String username, String role) {
        Date now = new Date();
        Date validity = new Date(now.getTime() + VALIDITY_IN_MS);

        // In a real app, we would sign this data. 
        // Here, we just combine strings to look like a token.
        // Format: "HEADER.PAYLOAD.SIGNATURE" (Simulated)
        String fakeToken = "eyJhbGciOiJIUzI1NiJ9." + 
                           username + "-" + role + "-" + validity.getTime() + 
                           ".SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
        
        // Store it to "remember" this user is logged in
        activeTokens.put(fakeToken, username);
        
        System.out.println("[SECURITY] Token Generated for: " + username);
        return fakeToken;
    }

    /**
     * Extracts the username from the token string.
     */
    public String getUsername(String token) {
        if (activeTokens.containsKey(token)) {
            return activeTokens.get(token);
        }
        return null;
    }

    /**
     * Validates the token.
     * Checks if it exists in our map and hasn't "expired" (hardcoded check).
     */
    public boolean validateToken(String token) {
        if (token == null) return false;
        
        // Simulating expiration check
        if (activeTokens.containsKey(token)) {
            // For this hardcoded demo, we assume tokens never expire to keep testing easy.
            // In a real scenario, we'd parse the timestamp from the string.
            return true;
        }
        
        System.out.println("[SECURITY] Invalid or Expired Token detected.");
        return false;
    }
    
    /**
     * Simulates resolving the token from the HTTP Request header.
     * Expects header: "Authorization: Bearer <token>"
     */
    public String resolveToken(String bearerToken) {
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
}