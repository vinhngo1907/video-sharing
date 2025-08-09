package com.video_sharing.app.video_sharing_app.repositories;

import com.video_sharing.app.video_sharing_app.Entities.UserEntity;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserRepository extends MongoRepository<UserEntity, String> {
    Optional<UserEntity> findByUsername(String name);
}
