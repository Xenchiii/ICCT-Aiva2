package com.icct.aiva.repository;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class EventRepository {

    public static class Event {
        public String id;
        public String title;
        public String date;
        public String type; // Academic, Holiday

        public Event(String id, String title, String date, String type) {
            this.id = id;
            this.title = title;
            this.date = date;
            this.type = type;
        }
    }

    private static final List<Event> eventTable = new ArrayList<>();

    static {
        eventTable.add(new Event("EVT-01", "Midterm Examination", "2026-03-15", "Academic"));
        eventTable.add(new Event("EVT-02", "ICCT Foundation Week", "2026-04-10", "Activity"));
    }

    public List<Event> findAll() {
        return new ArrayList<>(eventTable);
    }

    public void save(Event event) {
        eventTable.add(event);
        System.out.println("[DB] Event saved: " + event.title);
    }

    // Example of a custom query method
    public List<Event> findAcademicEvents() {
        return eventTable.stream()
                .filter(e -> "Academic".equals(e.type))
                .collect(Collectors.toList());
    }
}