export interface Participant {
    name?: string;
    audio?: boolean;
    video?: boolean;
    screen?: boolean;
    currentUser?: boolean;
    avatarColor?: string;
    peerConnection?: RTCPeerConnection;
}

export interface LiveStreamState {
    mainStream: MediaStream | null;
    participants: Record<string, Participant>;
    currentUser: Record<string, Participant> | null;
    isStreamer: boolean;
    streamer: any;
    HTMLParticipants: Record<string, any>;
    streamId: string | null;
}