package com.video_sharing.app.video_sharing_app.Services.Notifications;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import com.video_sharing.app.video_sharing_app.controllers.Responses.ResponseMessage;

@Service
public class WSService {
    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    public void notifyFrontEnd(final ResponseMessage message, String username) {
        simpMessagingTemplate.convertAndSend("/notifications/" + username);
    }
}
