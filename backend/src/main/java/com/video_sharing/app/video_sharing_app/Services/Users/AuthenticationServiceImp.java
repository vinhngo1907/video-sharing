package com.video_sharing.app.video_sharing_app.Services.Users;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import com.video_sharing.app.video_sharing_app.Entities.UserEntity;
import com.video_sharing.app.video_sharing_app.Services.JWT.JwtService;
import com.video_sharing.app.video_sharing_app.controllers.Requests.LoginRequest;
import com.video_sharing.app.video_sharing_app.controllers.Requests.RegisterRequest;
import com.video_sharing.app.video_sharing_app.controllers.Responses.AuthenticationResponse;
import com.video_sharing.app.video_sharing_app.models.Users.Role;
import com.video_sharing.app.video_sharing_app.models.Users.UserDetailsImp;
import com.video_sharing.app.video_sharing_app.repositories.UserRepository;

public class AuthenticationServiceImp implements AuthenticationService {
    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    JwtService jwtService;

    @Autowired
    AuthenticationManager authenticationManger;

    @Override
    public AuthenticationResponse login(LoginRequest req) {
        var user = userRepository.findByUsername(req.getUsername()).orElseThrow();
        try {
            authenticationManger.authenticate(
                    new UsernamePasswordAuthenticationToken(req.getUsername(), req.getPassword()));
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }

        System.out.println("login method: " + authenticationManger.authenticate(
                new UsernamePasswordAuthenticationToken(
                        req.getUsername(),
                        req.getPassword()))
                .isAuthenticated());
        UserDetailsImp userDetailsImp = new UserDetailsImp();
        BeanUtils.copyProperties(user, userDetailsImp);
        var token = jwtService.generateToken(userDetailsImp);
        return AuthenticationResponse.builder()
                .jwtToken(token)
                .username(userDetailsImp.getUsername())
                .firstName(userDetailsImp.getFirstName())
                .lastName(userDetailsImp.getLastName())
                .profilePicture(userDetailsImp.getProfilePicture())
                .id(userDetailsImp.getId())
                .likedVideos(user.getLikedVideos())
                .subscribedToUsers(user.getSubscribedToUsers())
                .subscribers(user.getSubscribers())
                .videoHistory(user.getVideoHistory())
                .dislikedVideos(user.getDislikedVideos())
                .build();
    }

    @Override
    public AuthenticationResponse register(RegisterRequest req) {
        var user = UserDetailsImp.builder()
                .username(req.getUsername())
                .password(passwordEncoder.encode(req.getPassword()))
                .firstName(req.getFirstName())
                .lastName(req.getLastName())
                .profilePicture(req.getProfilePicture())
                .role(Role.USER)
                .build();

        UserEntity userEntity = new UserEntity();
        BeanUtils.copyProperties(user, userEntity);
        UserEntity userSaved = userRepository.save(userEntity);

        UserDetailsImp userRegistered = new UserDetailsImp();
        BeanUtils.copyProperties(userSaved, userRegistered);
        String token = jwtService.generateToken(userRegistered);

        return AuthenticationResponse.builder()
                .jwtToken(token)
                .lastName(userSaved.getLastName())
                .firstName(userSaved.getFirstName())
                .username(userSaved.getUsername())
                .id(userSaved.getId())
                .profilePicture(userSaved.getProfilePicture())
                .likedVideos(userSaved.getLikedVideos())
                .subscribedToUsers(userSaved.getSubscribedToUsers())
                .subscribers(userSaved.getSubscribers())
                .videoHistory(userSaved.getVideoHistory())
                .dislikedVideos(userSaved.getDislikedVideos())
                .build();
    }
}
