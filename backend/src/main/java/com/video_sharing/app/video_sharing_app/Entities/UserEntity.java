package com.video_sharing.app.video_sharing_app.Entities;

import com.video_sharing.app.video_sharing_app.models.Users.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(value="user")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserEntity {
    @Id
    private String id;
    private String firstName;
    private String lastName;

    @Indexed(unique = true)
    private String username;

    private Role role;

    private String password;

    private String profilePicture;
    private Set<String> subscribedToUsers;
    private Set<String> subscribers;

    private List<String> videoHistory;
    private Set<String> likedVideos;
    private Set<String> dislikedVideos;
}
