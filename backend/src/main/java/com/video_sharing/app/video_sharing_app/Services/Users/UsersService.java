package com.video_sharing.app.video_sharing_app.Services.Users;

import java.util.List;

import com.video_sharing.app.video_sharing_app.Entities.UserEntity;
import com.video_sharing.app.video_sharing_app.Entities.VideoEntity;
import com.video_sharing.app.video_sharing_app.controllers.Responses.UserResponse;
import com.video_sharing.app.video_sharing_app.exceptions.LikesException;
import com.video_sharing.app.video_sharing_app.exceptions.NoVideosException;
import com.video_sharing.app.video_sharing_app.exceptions.UserNotfoundException;

public interface UsersService {
    UserEntity getUser(String id) throws UserNotfoundException;

    // UserResponse updateUser(String id, UserEntity newUserDetails) throws UserNotfoundException, LikesException;

    List<UserEntity> getAllUsers();

    UserEntity deleteUser(String id);

    UserResponse removeLikedVideo(String idUser, String idVideo) throws Exception;

    UserResponse removeDisLikedVideo(String idUser, String idVideo) throws Exception;

    List<VideoEntity> getUserVideos(String idUser) throws NoVideosException;

    // boolean changeUserPassword(String idUser, String currentPassword, String newPassword);
}
