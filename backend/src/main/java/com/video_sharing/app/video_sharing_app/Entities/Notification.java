package com.video_sharing.app.video_sharing_app.Entities;

import java.util.Date;
import java.util.Set;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Notification {
    private String message;
    private String idSender;
    private Date date;
    private Set<String> usersToNotify;
}
