package com.video_sharing.app.video_sharing_app.controllers.Responses;

import java.util.List;
import java.util.Set;

import com.video_sharing.app.video_sharing_app.models.Users.Role;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserResponse {
    private String id;
    private String username;
    private String firstName;
    private String lastName;
    private Role role;
    private String profilePicture;
    private Set<String> subscribedToUsers;
    private Set<String> subscribers;
    private List<String> videoHistory;
    private List<String> likedVideos;
    private List<String> dislikedVideos;
}