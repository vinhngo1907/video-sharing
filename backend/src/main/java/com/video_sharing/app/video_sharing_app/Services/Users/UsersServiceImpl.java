package com.video_sharing.app.video_sharing_app.Services.Users;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
// import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.video_sharing.app.video_sharing_app.Entities.UserEntity;
import com.video_sharing.app.video_sharing_app.Entities.VideoEntity;
import com.video_sharing.app.video_sharing_app.controllers.Responses.UserResponse;
import com.video_sharing.app.video_sharing_app.exceptions.NoVideosException;
import com.video_sharing.app.video_sharing_app.exceptions.UserNotfoundException;
// import com.video_sharing.app.video_sharing_app.Services.Notifications.WSService;
import com.video_sharing.app.video_sharing_app.repositories.UserRepository;
import com.video_sharing.app.video_sharing_app.repositories.VideoRepository;

import java.util.*;

@Service
public class UsersServiceImpl implements UsersService {
    @Autowired
    UserRepository userRepository;

    @Autowired
    MongoTemplate mongoTemplate;

    @Autowired
    private VideoRepository videoRepository;

    // @Autowired
    // PasswordEncoder passwordEncoder;

    @Override
    public UserEntity getUser(String id) throws UserNotfoundException {
        UserEntity user;
        try {
            user = userRepository.findById(id).get();
        } catch (Exception e) {
            System.out.println(e.getMessage());
            throw new UserNotfoundException("Can not find a user with this id" + id);
        }

        return user;
    }

    // @Override
    // public UserReponse updateUser(String id, UserEntity newUserDetails) throws
    // UserNotfoundException {
    // UpdateResult updatedUser;
    // try {

    // } catch (Exception e) {
    // // TODO: handle exception
    // throw new UserNotfoundException("Can't find user");
    // }
    // }
    @Override
    public UserResponse removeLikedVideo(String idUser, String idVideo) throws Exception {
        try {
            UserEntity user = userRepository.findById(idUser).get();
            Set<String> likedVideos = user.getLikedVideos();
            if (likedVideos.contains(idVideo)) {
                likedVideos.remove(idVideo);
                user.setLikedVideos(likedVideos);
            }

            userRepository.save(user);
            UserResponse userResponse = new UserResponse();
            BeanUtils.copyProperties(user, userResponse);
            return userResponse;
        } catch (Exception e) {
            // TODO: handle exception
            throw new Exception("Can't find user");
        }
    }

    @Override
    public UserResponse removeDisLikedVideo(String idUser, String idVideo) throws Exception {
        try {
            UserEntity user = userRepository.findById(idVideo).get();
            Set<String> disLikedVideos = user.getDislikedVideos();
            if (disLikedVideos.contains(idVideo)) {
                disLikedVideos.remove(idVideo);
                user.setDislikedVideos(disLikedVideos);
            }

            userRepository.save(user);
            UserResponse userResponse = new UserResponse();
            BeanUtils.copyProperties(user, userResponse);
            return userResponse;
        } catch (Exception e) {
            // TODO: handle exception
            throw new Exception("Can't find user");
        }
    }

    @Override
    public List<UserEntity> getAllUsers() {
        return null;
    }

    @Override
    public UserEntity deleteUser(String id) {
        return null;
    }

    @Override
    public List<VideoEntity> getUserVideos(String idUser) throws NoVideosException {
        try {
            List<VideoEntity> userVideos = videoRepository.findAllByUserId(idUser);
            return userVideos;
        } catch (Exception e) {
            // TODO: handle exception
            throw new NoVideosException("no videos for this user" + idUser);
        }
    }
}
