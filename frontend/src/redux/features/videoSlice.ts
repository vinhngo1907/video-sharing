// features/video/videoSlice.ts
import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { VideoDetails, VideoState } from "../types/video";
import { getAllVideos } from "../../services/video";

const initialState: VideoState = {
    videoDetails: null,
    isUploading: false,
    progressUploading: 0,
    uploaded: false,
    errorUpload: null,
    isFetching: false,
    videos: [],
    errorFetching: null,
};

export const fetchVideos = createAsyncThunk(
    "video/fetchVideos",
    async (userId: string | undefined = undefined, thunkAPI) => {
        try {
            const res = await getAllVideos(userId);
            return res.data  as VideoDetails[];
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

const videoSlice = createSlice({
    name: "video",
    initialState,
    reducers: {
        saveVideoDetails(state, action: PayloadAction<any | null>) {
            state.videoDetails = action.payload
                ? { ...state.videoDetails, ...action.payload }
                : null; // cho phép reset
        },
        setVideoUploading(state, action: PayloadAction<boolean>) {
            state.isUploading = action.payload;
        },
        setUploadingProgress(state, action: PayloadAction<number>) {
            state.progressUploading = action.payload;
        },
        setUploaded(state, action: PayloadAction<boolean>) {
            state.uploaded = action.payload;
        },
        setUploadError(state, action: PayloadAction<string | null>) {
            state.errorUpload = action.payload;
        },
        resetUploadState(state) {
            state.isUploading = false;
            state.progressUploading = 0;
            state.uploaded = false;
            state.errorUpload = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchVideos.pending, (state) => {
                state.isFetching = true;
                state.errorFetching = null;
            })
            .addCase(fetchVideos.fulfilled, (state, action) => {
                state.isFetching = false;
                state.videos = action.payload;
            })
            .addCase(fetchVideos.rejected, (state, action) => {
                state.isFetching = false;
                state.errorFetching = action.payload as string || "Failed to fetch videos";
            });
    },
});

export const {
    saveVideoDetails,
    setVideoUploading,
    setUploadingProgress,
    setUploaded,
    setUploadError,
    resetUploadState,
} = videoSlice.actions;

export default videoSlice.reducer;
