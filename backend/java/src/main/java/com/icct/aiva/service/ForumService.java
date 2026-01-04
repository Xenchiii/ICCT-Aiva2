package com.icct.aiva.service;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class ForumService {

    private static final String DB_URL = "jdbc:sqlite:backend/database.sqlite";

    public static class Post {
        public int id;
        public String author;
        public String content;
        
        public Post(int id, String author, String content) {
            this.id = id;
            this.author = author;
            this.content = content;
        }
    }

    public List<Post> getAllPosts() {
        List<Post> posts = new ArrayList<>();
        String sql = "SELECT id, author_name, content FROM forum_posts ORDER BY created_at DESC";

        try (Connection conn = DriverManager.getConnection(DB_URL);
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {

            while (rs.next()) {
                posts.add(new Post(
                    rs.getInt("id"),
                    rs.getString("author_name"),
                    rs.getString("content")
                ));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return posts;
    }

    public void createPost(String author, String content) {
        String sql = "INSERT INTO forum_posts(author_name, content) VALUES(?, ?)";
        
        try (Connection conn = DriverManager.getConnection(DB_URL);
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            
            pstmt.setString(1, author);
            pstmt.setString(2, content);
            pstmt.executeUpdate();
            
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}