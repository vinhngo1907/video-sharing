import React, { useEffect, useState } from "react";
import { VideoContainer, ThumbnailImage } from "./VideoStyles";
import "./Video.css";
import { countFormatter } from "../../utils/countFormatter";
import { getUser } from "../../services/user";
// import { countFormatter } from "../../utils/countFormatter";
// import { getUser  } from "../../services/userService";

interface Video {
    id: string;
    title?: string;
    userId?: string;
    videoUrl?: string;
    thumbnailUrl?: string;
    viewsCount?: number;
}

interface User {
    profilePicture?: string;
    username?: string;
}

interface VideoComponentProps {
    video: Video;
}

const VideoComponent: React.FC<VideoComponentProps> = ({ video }) => {
    const [videoUser, setVideoUser] = useState<User | null>(null);

    useEffect(() => {
        if (video?.userId) {
            getUser(video.userId).then((res) => {
                setVideoUser(res);
            });
        }
    }, [video]);

    const isLiveStream = video?.title?.startsWith("Live stream");
    const isLiveStreaming = video?.title?.startsWith("Live streaming");

    const link = isLiveStreaming
        ? video?.videoUrl
        : `/videos?id=${video.id}`;

    const thumbnailSrc = video?.thumbnailUrl || "";
    const authorImageSrc = videoUser?.profilePicture || "/images/defaultProfile.jpg";
    const authorName = videoUser?.username || "No name";
    const views = countFormatter(video?.viewsCount || 0);

    if (isLiveStream) {
        return (
            <a className="videoContainer" href={link}>
                <ThumbnailImage className="thumbnail-img">
                    <img
                        src={thumbnailSrc}
                        alt="video thumbnail"
                        className="thumbnail-img"
                        loading="lazy"
                    />
                </ThumbnailImage>
                <div className="infos">
                    <div className="authorImage">
                        <img
                            src={authorImageSrc}
                            alt="channel"
                            className="channel-img min-w-[3rem] min-h-[3rem]"
                        />
                    </div>
                    <div className="video-infos">
                        <ul>
                            <li className="title max-w-[100%] max-h-[1.4rem] overflow-hidden">
                                {video?.title}
                            </li>
                            <li className="font-medium">{authorName}</li>
                            <li>{views} views</li>
                        </ul>
                    </div>
                </div>
            </a>
        );
    }

    return (
        <VideoContainer to={link || `/videos?id=${video.id}`}>
            <ThumbnailImage className="thumbnail-img">
                <img
                    src={thumbnailSrc}
                    alt="video thumbnail"
                    className="thumbnail-img"
                    loading="lazy"
                />
            </ThumbnailImage>
            <div className="infos">
                <div className="authorImage">
                    <img
                        src={authorImageSrc}
                        alt="channel"
                        className="channel-img min-w-[3rem] min-h-[3rem]"
                    />
                </div>
                <div className="video-infos">
                    <ul>
                        <li className="title max-w-[100%] max-h-[1.4rem] overflow-hidden">
                            {video?.title}
                        </li>
                        <li className="font-medium">{authorName}</li>
                        <li>{views} views</li>
                    </ul>
                </div>
            </div>
        </VideoContainer>
    );
};

export default VideoComponent;
