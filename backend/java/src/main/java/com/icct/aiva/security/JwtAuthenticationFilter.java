package com.icctaiva.security;

public class JwtAuthenticationFilter {

    private JwtTokenProvider tokenProvider;

    public JwtAuthenticationFilter() {
        this.tokenProvider = new JwtTokenProvider();
    }

    /**
     * Simulates filtering an incoming request.
     * @param authHeader The value of the "Authorization" header from the request.
     * @param requestPath The URL path user is trying to access (e.g., "/api/grades")
     * @return boolean True if access is allowed, False if denied.
     */
    public boolean doFilter(String authHeader, String requestPath) {
        
        // Public paths that don't need login
        if (requestPath.equals("/api/auth/login") || requestPath.equals("/api/auth/register")) {
            System.out.println("[FILTER] Public access allowed: " + requestPath);
            return true;
        }

        // 1. Get the token from the header
        String token = tokenProvider.resolveToken(authHeader);

        // 2. Validate the token
        if (token != null && tokenProvider.validateToken(token)) {
            String username = tokenProvider.getUsername(token);
            System.out.println("[FILTER] Authenticated User: " + username + " accessing " + requestPath);
            
            // (Mock) Set authentication context here
            return true;
        }

        // 3. Deny access if validation fails
        System.out.println("[FILTER] Access Denied: Unauthorized request to " + requestPath);
        return false;
    }
}