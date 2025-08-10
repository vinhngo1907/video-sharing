package com.video_sharing.app.video_sharing_app.controllers.Responses;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResponseMessage {
    private String message;
    private String idSender;
    private final Date date = new Date();
}
