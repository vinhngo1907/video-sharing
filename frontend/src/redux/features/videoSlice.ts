// features/video/videoSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { VideoState } from "../types/video";

const initialState: VideoState = {
    videoDetails: null,
    isUploading: false,
    progressUploading: "0%",
    uploaded: false,
    errorUpload: null,
};

const videoSlice = createSlice({
    name: "video",
    initialState,
    reducers: {
        saveVideoDetails(state, action: PayloadAction<any>) {
            state.videoDetails = {
                ...state.videoDetails,
                ...action.payload,
            };
        },
        setVideoUploading(state) {
            state.isUploading = !state.isUploading;
        },
        setUploadingProgress(state, action: PayloadAction<string>) {
            state.progressUploading = action.payload;
        },
        setUploaded(state, action: PayloadAction<boolean>) {
            state.uploaded = action.payload;
        },
        setUploadError(state, action: PayloadAction<string | null>) {
            state.errorUpload = action.payload;
        },
    },
});

export const {
    saveVideoDetails,
    setVideoUploading,
    setUploadingProgress,
    setUploaded,
    setUploadError,
} = videoSlice.actions;

export default videoSlice.reducer;
