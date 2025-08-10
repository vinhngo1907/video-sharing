export interface VideoState {
    videoDetails: any | null;
    isUploading: boolean;
    progressUploading: string;
    uploaded: boolean;
    errorUpload: string | null;
}

export interface VideoDetails {
    description: string;
    title: string;
    userId: string;
    likes: number;
    dislikes: number;
    tags: string[];
    videoURL: string;
    videoStatus: "public" | "private" | "unlisted";
    viewsCount: number;
    thumbnailUrl: string;
    id?: string ;
}