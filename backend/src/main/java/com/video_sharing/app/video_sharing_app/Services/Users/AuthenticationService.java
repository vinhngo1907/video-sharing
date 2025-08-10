package com.video_sharing.app.video_sharing_app.Services.Users;

import com.video_sharing.app.video_sharing_app.controllers.Requests.LoginRequest;
import com.video_sharing.app.video_sharing_app.controllers.Requests.RegisterRequest;
import com.video_sharing.app.video_sharing_app.controllers.Responses.AuthenticationResponse;

public interface AuthenticationService {
    AuthenticationResponse login(LoginRequest req);

    AuthenticationResponse register(RegisterRequest req);
}
