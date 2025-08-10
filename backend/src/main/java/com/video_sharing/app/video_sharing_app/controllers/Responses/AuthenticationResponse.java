package com.video_sharing.app.video_sharing_app.controllers.Responses;

import java.util.List;
import java.util.Set;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AuthenticationResponse {
     private String jwtToken ;
    private String username ;
    private String lastName ;
    private String firstName ;
    private String profilePicture ;
    private String id ;
    private Set<String> subscribedToUsers ;
    private  Set<String> subscribers ;
    private List<String> videoHistory ;
    private Set<String> likedVideos ;
    private Set<String> dislikedVideos;
}
