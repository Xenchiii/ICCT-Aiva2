package com.icct.aiva.config;

public class WebConfig {

    // The URL of your React Frontend
    private static final String ALLOWED_ORIGIN = "http://localhost:5173";

    /**
     * Validates if the request is coming from your trusted frontend.
     */
    public boolean checkCors(String originHeader) {
        if (originHeader == null) return true; // Allow non-browser requests (like Postman) for testing

        if (originHeader.equals(ALLOWED_ORIGIN) || originHeader.equals("http://localhost:3000")) {
            return true;
        }

        System.out.println("[CORS] Blocked request from unknown origin: " + originHeader);
        return false;
    }

    /**
     * Returns the standard headers needed to satisfy browser CORS checks.
     */
    public String getCorsHeaders() {
        return "Access-Control-Allow-Origin: " + ALLOWED_ORIGIN + "\n" +
               "Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS\n" +
               "Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With";
    }
}