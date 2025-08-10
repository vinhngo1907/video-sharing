package com.video_sharing.app.video_sharing_app.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.video_sharing.app.video_sharing_app.Entities.VideoEntity;

public interface VideoRepository extends MongoRepository<VideoEntity, String> {
    Optional<VideoEntity> findById(String id);

    boolean existsById(String id);

    List<VideoEntity> findAllByUserId(String userId) ;
}
