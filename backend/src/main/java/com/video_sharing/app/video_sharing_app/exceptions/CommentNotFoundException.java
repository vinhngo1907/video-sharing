package com.video_sharing.app.video_sharing_app.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND, reason = "There's no matching the provided id")
public class CommentNotFoundException extends RuntimeException {

}
