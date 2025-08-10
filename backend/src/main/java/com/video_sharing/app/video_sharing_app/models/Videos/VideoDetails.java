package com.video_sharing.app.video_sharing_app.models.Videos;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VideoDetails {
    private String description;
    private String title;
    private String userId;
    private List<String> tags;
    private String videoURL;
    private String videoStatus;
    private String thumbnailUrl;
}
