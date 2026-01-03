package com.icct.aiva.controller;

import com.icctaiva.repository.UserRepository;
import com.icctaiva.model.User;
import com.google.gson.Gson;
import java.util.Optional;

public class UserController {

    @SuppressWarnings("unused")
    private UserRepository userRepo;
    private Gson gson;

    public UserController() {
        this.userRepo = new UserRepository();
        this.gson = new Gson();
    }

    // GET /api/user/profile
    public String getProfile(String email) {
        Optional<User> user = com.icctaiva.repository.UserRepository.User.findByEmail(email);
        if (user.isPresent()) {
            return gson.toJson(user.get());
        } else {
            return "{\"error\": \"User not found\"}";
        }
    }
}