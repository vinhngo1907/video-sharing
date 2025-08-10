package com.video_sharing.app.video_sharing_app.Services.Videos;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.video_sharing.app.video_sharing_app.Entities.VideoEntity;
import com.video_sharing.app.video_sharing_app.Entities.VideoStatus;
import com.video_sharing.app.video_sharing_app.exceptions.VideoNotFoundException;
import com.video_sharing.app.video_sharing_app.models.Videos.VideoDetails;
import com.video_sharing.app.video_sharing_app.repositories.UserRepository;
import com.video_sharing.app.video_sharing_app.repositories.VideoRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class IVideoServiceImpl implements IVideoService {
    @Autowired
    VideoRepository videoRepository;

    @Autowired
    UserRepository userRepository;

    void throwExceptionIfNotExist(String id) {
        if (!videoRepository.existsById(id)) {
            throw new VideoNotFoundException();
        }
    }

    @Override
    public List<VideoEntity> getAllVideos() {
        return videoRepository.findAll();
    };

    @Override
    public VideoEntity getVideo(String id) throws VideoNotFoundException {
        throwExceptionIfNotExist(id);
        return videoRepository.findById(id).get();
    }

    @Override
    public VideoEntity addVideo(VideoDetails video) {
        System.out.println("Request BODY: " + video);
        VideoEntity createdVideo = new VideoEntity();
        createdVideo.setTitle(video.getTitle());
        createdVideo.setDescription(video.getDescription());
        createdVideo.setUserId(video.getUserId());
        createdVideo.setVideoUrl(video.getVideoURL());
        createdVideo.setThumbnailUrl(video.getThumbnailUrl());
        createdVideo.setTags(video.getTags());

        if (video.getVideoStatus() != null && video.getVideoStatus().equals("public")) {
            createdVideo.setVideoStatus(VideoStatus.PUBLIC);
        } else if (video.getVideoStatus() != null && video.getVideoStatus().equals("private")) {
            createdVideo.setVideoStatus(VideoStatus.PRIVATE);
        } else {
            createdVideo.setVideoStatus(VideoStatus.UNLISTED);
        }

        System.out.println(createdVideo);
        return videoRepository.save(createdVideo);
    }

    @Override
    public void deleteVideo(String id) {
        throwExceptionIfNotExist(id);
        videoRepository.deleteById(id);
    }

    // @Override
    // public VideoEntity updateVideo(String id, VideoEntity v) {

    // }
}
