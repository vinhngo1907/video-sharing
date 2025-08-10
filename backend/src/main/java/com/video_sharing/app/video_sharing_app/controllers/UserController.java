package com.video_sharing.app.video_sharing_app.controllers;

import java.util.List;

import javax.management.RuntimeErrorException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.graphql.GraphQlProperties.Http;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.video_sharing.app.video_sharing_app.Entities.UserEntity;
import com.video_sharing.app.video_sharing_app.Entities.VideoEntity;
import com.video_sharing.app.video_sharing_app.Services.Users.UsersService;
import com.video_sharing.app.video_sharing_app.controllers.Requests.RemoveLikedVideoReq;
import com.video_sharing.app.video_sharing_app.controllers.Responses.UserResponse;
import com.video_sharing.app.video_sharing_app.exceptions.UserNotfoundException;
import com.video_sharing.app.video_sharing_app.repositories.UserRepository;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    UsersService usersService;

    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return new ResponseEntity<String>("user is working", HttpStatus.OK);
    }

    @GetMapping("/{id}/videos")
    public ResponseEntity getUserVideos(@PathVariable String id) {
        try {
            List<VideoEntity> userVideos = usersService.getUserVideos(id);
            return new ResponseEntity<>(userVideos, HttpStatus.OK);
        } catch (Exception e) {
            // TODO: handle exception
            System.out.println("Something wrong!!!" + e.getMessage());
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserEntity> getUser(@PathVariable String id) {
        try {
            UserEntity user = usersService.getUser(id);
            return new ResponseEntity<UserEntity>(user, HttpStatus.OK);
        } catch (UserNotfoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/likedVideos/{id}")
    public ResponseEntity removeLikedVideo(@PathVariable String id, @RequestBody RemoveLikedVideoReq req) {
        try {
            UserResponse updatedUser = usersService.removeLikedVideo(id, req.getIdVideo());
            return new ResponseEntity<UserResponse>(updatedUser, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/dislikedVideo/{id}")
    public ResponseEntity removeDisLikedVideo(String id, @RequestParam RemoveLikedVideoReq req) {
        try {
            UserResponse updatedUser = usersService.removeDisLikedVideo(id, req.getIdVideo());
            return new ResponseEntity<UserResponse>(updatedUser, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
}
