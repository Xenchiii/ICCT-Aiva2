// FIX: Updated package to match your folder structure
package com.icct.aiva.controller;

// FIX: Updated import to match the correct package
import com.icct.aiva.service.EventService;
import com.google.gson.Gson;

public class EventController {

    private EventService eventService;
    private Gson gson;

    public EventController() {
        this.eventService = new EventService();
        this.gson = new Gson();
    }

    // GET /api/events
    public String getEvents() {
        return gson.toJson(eventService.getUpcomingEvents());
    }

    // POST /api/events
    public String createEvent(String requestBody) {
        // Logic to parse JSON and call eventService.createEvent(...)
        // Skipping parsing boilerplate for brevity
        return "{\"message\": \"Event Created (Mock)\"}";
    }
}