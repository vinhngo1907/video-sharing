package com.video_sharing.app.video_sharing_app.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.video_sharing.app.video_sharing_app.Services.Users.AuthenticationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    AuthenticationService authenticationService;

    @GetMapping("/test")
    public ResponseEntity<String> testingRoute(@RequestParam String param) {
        return ResponseEntity.ok("Hello from authentication route");
    }

}
