package com.video_sharing.app.video_sharing_app.Entities;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(value="Video")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class VideoEntity {
    @Id
    private String id;
    private String description;
    private String title;
    private String userId;
    private Integer likes;
    private Integer dislikes;
    private List<String> tags;
    private String videoUrl;
    private VideoStatus videoStatus;
    private Integer viewCount = 0;
    private String thumbnailUrl;
}
