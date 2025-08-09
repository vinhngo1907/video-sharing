export interface VideoState {
    videoDetails: any | null;
    isUploading: boolean;
    progressUploading: string;
    uploaded: boolean;
    errorUpload: string | null;
}