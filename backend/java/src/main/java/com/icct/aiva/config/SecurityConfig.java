package com.icct.aiva.config;

import java.util.ArrayList;
import java.util.List;

public class SecurityConfig {

    // List of paths that do not require an Auth Token
    private static final List<String> PUBLIC_URLS = new ArrayList<>();

    static {
        PUBLIC_URLS.add("/api/auth/login");
        PUBLIC_URLS.add("/api/auth/register");
        PUBLIC_URLS.add("/api/status"); // Health check
    }

    /**
     * Checks if the requested path is public.
     */
    public boolean isPublicEndpoint(String path) {
        return PUBLIC_URLS.contains(path);
    }

    /**
     * Simulates Role-Based Access Control (RBAC).
     * e.g., Students shouldn't access /admin paths.
     */
    public boolean isAccessAllowed(String userRole, String path) {
        // Admins can go anywhere
        if ("Admin".equalsIgnoreCase(userRole)) {
            return true;
        }

        // Students cannot access admin endpoints
        if ("Student".equalsIgnoreCase(userRole) && path.startsWith("/api/admin")) {
            System.out.println("[SECURITY] Access Denied: Student attempted to access Admin area.");
            return false;
        }

        return true;
    }
}