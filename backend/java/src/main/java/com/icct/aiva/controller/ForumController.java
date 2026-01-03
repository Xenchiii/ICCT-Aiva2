// FIX: Correct Package Name
package com.icct.aiva.controller;

// FIX: Correct Imports
import com.icct.aiva.repository.UserRepository;
// Note: Ensure your UserRepository returns this User model, or update this import to match
import com.icct.aiva.model.User; 
import com.google.gson.Gson;
import java.util.Optional;

// FIX: Removed "<UserRepository>" which was causing the instantiation error
public class UserController {

    private UserRepository userRepo;
    private Gson gson;

    public UserController() {
        // Now this will work because UserRepository refers to the actual class, not a generic type
        this.userRepo = new UserRepository();
        this.gson = new Gson();
    }

    // GET /api/user/profile
    public String getProfile(String email) {
        // Note: Depending on your UserRepository implementation, 
        // you might need to change 'User' here to 'UserRepository.User' if you used the inner class version.
        // Assuming you are using the separate Model class:
        Optional<User> user = userRepo.findByEmail(email);
        
        if (user.isPresent()) {
            return gson.toJson(user.get());
        } else {
            return "{\"error\": \"User not found\"}";
        }
    }
}