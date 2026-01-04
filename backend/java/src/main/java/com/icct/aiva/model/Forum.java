package com.icct.aiva.model;

import java.util.ArrayList;
import java.util.List;

public class Forum {
    private int postId;
    private String authorName;
    @SuppressWarnings("unused")
    private String authorRole; // "Student" or "Professor"
    private String content;
    @SuppressWarnings("unused")
    private String timestamp;
    private int likes;
    private List<String> comments; // Simple list of comments for now

    public Forum(int postId, String authorName, String authorRole, String content, String timestamp) {
        this.postId = postId;
        this.authorName = authorName;
        this.authorRole = authorRole;
        this.content = content;
        this.timestamp = timestamp;
        this.likes = 0;
        this.comments = new ArrayList<>();
    }

    // Getters and Setters
    public int getPostId() { return postId; }
    public void setPostId(int postId) { this.postId = postId; }

    public String getAuthorName() { return authorName; }
    public void setAuthorName(String authorName) { this.authorName = authorName; }

    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
    
    public int getLikes() { return likes; }
    public void setLikes(int likes) { this.likes = likes; }

    public void addComment(String comment) {
        this.comments.add(comment);
    }
    
    public List<String> getComments() {
        return comments;
    }
}