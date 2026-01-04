package com.icct.aiva.controller;

import com.icct.aiva.service.EventService;
// If you have an Event model, import it here. For now, we'll assume it returns a generic object or list.
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/events")
public class EventController {

    @Autowired
    private EventService eventService;

    // GET /api/events
    @GetMapping
    public ResponseEntity<?> getEvents() {
        // Spring automatically converts the list from the service into JSON
        return ResponseEntity.ok(eventService.getUpcomingEvents());
    }

    // POST /api/events
    @PostMapping
    public ResponseEntity<?> createEvent(@RequestBody Map<String, Object> eventData) {
        // This is a placeholder. Ideally, you should create an 'Event' class 
        // and use @RequestBody Event event instead of Map.
        
        // boolean success = eventService.createEvent(eventData); 
        
        // Mock success response for now
        return ResponseEntity.ok(Map.of("message", "Event Created Successfully"));
    }
}