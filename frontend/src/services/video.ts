// services/video.ts
import axios from "axios";
// import {
//     sendNotification,
//     sendVideoUploadedNotification,
// } from "./notifications";
import { AuthorizationHeader } from "../utils/setAuthToken";
import type { VideoDetails } from "../redux/types/video";
import { API_BASE_URL } from "../contexts/constants";
type AxiosResponse<T = any> = Awaited<ReturnType<typeof axios.get>>;

axios.defaults.withCredentials = false;

// const API_BASE_URL = "http://localhost:8080/api/";

export const getAllVideos = async (idUser?: string) => {
    const url = idUser
        ? `${API_BASE_URL}videosRecommend?idUser=${idUser}`
        : `${API_BASE_URL}videos`;
    return axios.get(url);
};

export const getVideo = async (id: string) => {
    return axios.get(`${API_BASE_URL}videos/${id}`);
};

export const viewVideo = async (
    idVideo: string,
    idUser: string,
    viewsCount: number
) => {
    // update views counter
    await axios.put(
        `${API_BASE_URL}videos/${idVideo}`,
        { viewsCount: parseInt(String(viewsCount)) },
        { headers: AuthorizationHeader() }
    );

    // update user's video history
    return axios.put(
        `${API_BASE_URL}users/${idUser}`,
        { videoHistory: [idVideo] },
        { headers: AuthorizationHeader() }
    );
};

export const  createVideo = async (
  videoDetails: Omit<VideoDetails, "id">
): Promise<AxiosResponse<VideoDetails>> => {
    const res = await axios.post(`${API_BASE_URL}videos`, videoDetails, {
        headers: AuthorizationHeader(),
    });

    // sendVideoUploadedNotification(
    //     `just uploaded new video: ${videoDetails.title}`,
    //     videoDetails.userId
    // );
    return res;
};

export const deleteVideo = async (id: string) => {
    return axios.delete(`${API_BASE_URL}videos/${id}`, {
        headers: AuthorizationHeader(),
    });
};

export const likeVideo = async (video: any, user: any) => {
    let isDislikedVideo = user?.dislikedVideos?.includes(video.id);

    if (isDislikedVideo) {
        await axios.put(
            `${API_BASE_URL}videos/${video.id}`,
            { dislikes: video.dislikes - 1 },
            { headers: AuthorizationHeader() }
        );
    }

    const resUser = await axios.put(
        `${API_BASE_URL}users/${user.id}`,
        { likedVideos: [video.id] },
        { headers: AuthorizationHeader() }
    );

    const resVideo = await axios.put(
        `${API_BASE_URL}videos/${video.id}`,
        { likes: video.likes + 1 },
        { headers: AuthorizationHeader() }
    );

    // sendNotification(
    //     `just liked your video titled: ${video.title}`,
    //     resVideo.data.userId,
    //     user.id
    // );

    return { userAfterLike: resUser.data, videoAfterLike: resVideo.data };
};

export const dislikeVideo = async (video: any, user: any) => {
    let isLikedVideo = user?.likedVideos?.includes(video.id);

    if (isLikedVideo) {
        await axios.put(
            `${API_BASE_URL}videos/${video.id}`,
            { likes: video.likes - 1 },
            { headers: AuthorizationHeader() }
        );
    }

    const resUser = await axios.put(
        `${API_BASE_URL}users/${user.id}`,
        { dislikedVideos: [video.id] },
        { headers: AuthorizationHeader() }
    );

    const resVideo = await axios.put(
        `${API_BASE_URL}videos/${video.id}`,
        { dislikes: video.dislikes + 1 },
        { headers: AuthorizationHeader() }
    );

    return { userAfterDislike: resUser.data, videoAfterDislike: resVideo.data };
};

export const searchVideos = async (key: string) => {
    const res = await axios.get(`${API_BASE_URL}videos/search?key=${key}`);
    return res.data;
};

export const filteredVideos = async (key: string) => {
    const res = await axios.get(`${API_BASE_URL}videos/find?key=${key}`);
    return res.data;
};