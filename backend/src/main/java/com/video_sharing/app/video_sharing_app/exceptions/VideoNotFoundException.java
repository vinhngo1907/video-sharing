package com.video_sharing.app.video_sharing_app.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND, reason = "There is no video matching the provide id")
public class VideoNotFoundException extends RuntimeException {

}
