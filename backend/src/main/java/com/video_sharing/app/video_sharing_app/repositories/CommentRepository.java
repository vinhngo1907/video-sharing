package com.video_sharing.app.video_sharing_app.repositories;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.video_sharing.app.video_sharing_app.Entities.CommentEntity;

public interface CommentRepository extends MongoRepository<CommentEntity, String> {
    Optional<CommentEntity> findById(String id);
}
