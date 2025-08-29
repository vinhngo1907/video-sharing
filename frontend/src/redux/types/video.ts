export interface VideoState {
  videoDetails: any | null;
  isUploading: boolean;
  progressUploading: number;
  uploaded: boolean;
  errorUpload: string | null;
  isFetching: boolean,
  videos: VideoDetails[],
  errorFetching: string | null;
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
  id?: string;
}

export interface IVideo {
  id: string;
  title?: string;
  url?: string;
  [key: string]: any;
}