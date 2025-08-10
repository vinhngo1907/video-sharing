package com.video_sharing.app.video_sharing_app.controllers.Requests;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PasswordChangeReq {
     String currentPassword;
     String newPassword;
}
