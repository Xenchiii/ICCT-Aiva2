package com.icctaiva.service;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class EventService {

    private static final String DB_URL = "jdbc:sqlite:backend/database.sqlite";

    public static class Event {
        public int id;
        public String title;
        public String date;
        
        public Event(int id, String title, String date) {
            this.id = id;
            this.title = title;
            this.date = date;
        }
    }

    public List<Event> getUpcomingEvents() {
        List<Event> events = new ArrayList<>();
        String sql = "SELECT id, title, event_date FROM events WHERE event_date >= DATE('now') ORDER BY event_date ASC";

        try (Connection conn = DriverManager.getConnection(DB_URL);
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {

            while (rs.next()) {
                events.add(new Event(
                    rs.getInt("id"),
                    rs.getString("title"),
                    rs.getString("event_date")
                ));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return events;
    }

    public void createEvent(String title, String date, String type) {
        String sql = "INSERT INTO events(title, event_date, type) VALUES(?, ?, ?)";
        
        try (Connection conn = DriverManager.getConnection(DB_URL);
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            
            pstmt.setString(1, title);
            pstmt.setString(2, date);
            pstmt.setString(3, type);
            pstmt.executeUpdate();
            
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}