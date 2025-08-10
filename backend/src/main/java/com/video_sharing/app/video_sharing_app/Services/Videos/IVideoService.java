package com.video_sharing.app.video_sharing_app.Services.Videos;

import java.util.List;
import java.util.Set;

import com.video_sharing.app.video_sharing_app.Entities.VideoEntity;
import com.video_sharing.app.video_sharing_app.models.Videos.VideoDetails;

public interface IVideoService {
    List<VideoEntity> getAllVideos();

    VideoEntity getVideo(String id) throws Exception;

    VideoEntity addVideo(VideoDetails video);

    void deleteVideo(String id);

    // VideoEntity updateVideo(String id, VideoDetails video);
    // Set<String> searchKeyWords(String key);

    // List<VideoEntity> searchVideo(String key);

    // List<VideoEntity> getVideosToRecommend(String idUser);

}
