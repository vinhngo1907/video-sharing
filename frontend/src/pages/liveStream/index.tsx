// liveStream.tsx
import React, { useEffect } from "react";
import MainScreen from "../../Components/MainScreen/";
import firepadRef, { db } from "../../streamingServer/firebase";
import { useSelector, connect } from "react-redux";
import {
    addParticipant, removeParticipant,
    setMainStream, setStreamer, setStreamId,
    setUser, updateParticipant
} from "../../redux/features/liveStreamSlice";
import { createVideo, getAllVideos } from "../../services/video";
import type { UserDetails } from "../../redux/types/user";
import type { VideoDetails } from "../../redux/types/video";

// ---- Redux State Type ----
interface RootState {
    isStreamer: boolean;
    mainStream?: MediaStream;
    currentUser?: Record<string, any>;
}

// ---- Props cho component ----
interface LiveStreamProps {
    stream?: MediaStream;
    user?: Record<string, any>;
    setMainStream: (stream: MediaStream) => void;
    addParticipant: (user: any) => void;
    setUser: (user: any) => void;
    removeParticipant: (userId: string) => void;
    updateParticipant: (user: any) => void;
    setStreamer: (streamer: any) => void;
    setStreamId: (id: string) => void;
}

const LiveStream: React.FC<LiveStreamProps> = (props) => {
    const isStreamer = useSelector((state: RootState) => state.isStreamer);
    // const user = JSON.parse(localStorage.getItem("user") || "{}");
    const user: UserDetails | null = JSON.parse(
        localStorage.getItem("user") || "null"
    );
    const userName = user?.username || "Guest";

    // Lấy stream local từ camera/micro
    const getUserStream = async (): Promise<MediaStream> => {
        return await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true,
        });
    };

    const connectedRef = db.database().ref(".info/connected");
    const participantRef = firepadRef.child("participants");

    const isUserSet = !!props.user;
    const isStreamSet = !!props.stream;

    // Get stream and resgis user when connecting
    useEffect(() => {
        const asyncFunc = async () => {
            const stream = await getUserStream();
            stream.getVideoTracks()[0].enabled = false;
            props.setMainStream(stream);

            connectedRef.on("value", (snap) => {
                if (snap.val()) {
                    const defaultPreference = {
                        audio: true,
                        video: false,
                        screen: false,
                    };
                    const userStatusRef = participantRef.push({
                        userName,
                        timestamp: db.database.ServerValue.TIMESTAMP,
                        preferences: defaultPreference,
                    });
                    props.setUser({
                        [userStatusRef.key]: { name: userName, ...defaultPreference },
                    });
                    userStatusRef.onDisconnect().remove();
                }
            });
        };
        asyncFunc();
    }, []);

    // If streamer, then create video record in DB
    useEffect(() => {
        const asyncFunc = async () => {
            let liveExist = false;
            const videos = await getAllVideos();
            (videos as any)?.data?.data?.forEach((video: any) => {
                if (video.title === `Live streaming from ${userName}`) {
                    liveExist = true;
                }
            });


            if (isStreamer && !liveExist && user) {
                const res = await createVideo({
                    description: `Live streaming from ${userName}, enjoy the stream without cut offs.`,
                    title: `Live streaming from ${userName}`,
                    userId: `${user.id}`,
                    likes: 0,
                    dislikes: 0,
                    tags: ["live stream"],
                    videoURL: window.location.href,
                    videoStatus: "public",
                    viewsCount: 0,
                    thumbnailUrl:
                        "https://media.gettyimages.com/id/1306922705/vector/live-stream-banner.jpg?s=612x612",
                });

                if (res.status === 201 && res.data) {
                    const video = res.data as VideoDetails;
                    console.log("LIVE STREAM CREATED SUCCESSFULLY 🟩");
                    props.setStreamId(video.id!);
                }
            }
        };
        asyncFunc();
    }, [isStreamer]);

    // Listen to participants
    useEffect(() => {
        if (isStreamSet && isUserSet) {
            participantRef.on("child_added", (snap) => {
                // Get the first streamer
                participantRef
                    .orderByChild("timestamp")
                    .limitToFirst(1)
                    .once("value")
                    .then((snapshot) => {
                        const firstElement = snapshot.val();
                        props.setStreamer(firstElement);
                    });

                // Listen to preferences changes
                participantRef
                    .child(snap.key as string)
                    .child("preferences")
                    .on("child_changed", (preferenceSnap) => {
                        const prefKey = preferenceSnap.key;
                        if (prefKey) {
                            props.updateParticipant({
                                [snap.key as string]: {
                                    [prefKey]: preferenceSnap.val(),
                                },
                            });
                        }
                    });

                // Add new participant
                const { userName: name, preferences = {} } = snap.val();
                props.addParticipant({
                    [snap.key as string]: {
                        name,
                        ...preferences,
                    },
                });
            });

            // When participant is deleted
            participantRef.on("child_removed", (snap) => {
                if (snap.key) {
                    props.removeParticipant(snap.key);
                }
            });
        }
    }, [isStreamSet, isUserSet]);

    return (
        <div className="App">
            <MainScreen />
        </div>
    );
};

const mapStateToProps = (state: RootState) => ({
    stream: state.mainStream,
    user: state.currentUser,
});

const mapDispatchToProps = {
    setMainStream,
    addParticipant,
    setUser,
    removeParticipant,
    updateParticipant,
    setStreamer,
    setStreamId,
};

export default connect(mapStateToProps, mapDispatchToProps)(LiveStream);