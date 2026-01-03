package com.icctaiva.repository;

import java.util.ArrayList;
import java.util.List;

public class ForumRepository {

    public static class Post {
        public int id;
        public String author;
        public String content;
        public String timestamp;

        public Post(int id, String author, String content, String timestamp) {
            this.id = id;
            this.author = author;
            this.content = content;
            this.timestamp = timestamp;
        }
    }

    private static final List<Post> postTable = new ArrayList<>();

    static {
        postTable.add(new Post(1, "Maria Clara", "Has anyone finished the Lab 3 exercise?", "2026-01-02 10:30 AM"));
        postTable.add(new Post(2, "Juan Dela Cruz", "Looking for groupmates for the thesis.", "2026-01-02 11:15 AM"));
    }

    public List<Post> findAll() {
        System.out.println("[DB] Fetching all forum posts...");
        return new ArrayList<>(postTable);
    }

    public void save(Post post) {
        // Simulate Auto-Increment ID
        post.id = postTable.size() + 1;
        postTable.add(post);
        System.out.println("[DB] New post saved ID: " + post.id);
    }
}