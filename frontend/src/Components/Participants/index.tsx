import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Participant from "../Participant";
import firepadRef from "../../streamingServer/firebase";
import { setIsStreamer } from "../../redux/features/liveStreamSlice";
import { type RootState } from "../../redux/store";
import type { ParticipantInfo } from "../../redux/types/liveStream";

const Participants: React.FC = () => {
    const dispatch = useDispatch();

    // Get data from Redux store
    const {
        participants,
        currentUser,
        mainStream,
        isStreamer,
        streamer,
    } = useSelector((state: RootState) => state.liveStream);

    // Use ref to save information into stream
    const streamInfos = useRef<any>({});

    const clearStreamData = () => {
        console.log("clearing...😲❄");
        firepadRef
            .remove()
            .then(() => {
                console.log("All data removed successfully.");
            })
            .catch((error) => {
                console.error("Error removing data:", error);
            });
    };

    // Gét participants from firebase
    const participantRef = firepadRef.child("participants");
    useEffect(() => {
        participantRef.on("value", (snapshot) => {
            if (snapshot.val()) {
                const streamParticipantsNames = Object.values(snapshot.val())?.map(
                    (item: any) => item?.userName
                );
                streamInfos.current.viewersCount = Object.keys(snapshot.val()).length;
                streamInfos.current.uniqueCountedParticipants = {};
                for (const participant of streamParticipantsNames) {
                    streamInfos.current.uniqueCountedParticipants[participant] =
                        streamInfos.current.uniqueCountedParticipants[participant]
                            ? streamInfos.current.uniqueCountedParticipants[participant] + 1
                            : 1;
                }
            }
        });
    }, []);

    const videoRef = useRef<HTMLVideoElement>(null);

    const participantKeys = Object.keys(participants || {});
    let firstParticipantKey: string | undefined;
    if (streamer) {
        firstParticipantKey = Object.keys(streamer)[0];
    }

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.srcObject = mainStream;
            videoRef.current.muted = true;
        }
    }, [currentUser, mainStream]);

    const currentUserData = currentUser
        ? Object.values(currentUser)[0]
        : null;

    const screenPresenter = participantKeys.find((element) => {
        const currentParticipant = participants[element];
        return currentParticipant?.screen;
    });

    const participantElements = participantKeys.map((element, index) => {
        if (element === firstParticipantKey) {
            const streamerParticipant = participants[firstParticipantKey!];
            const pc = streamerParticipant?.peerConnection;
            const remoteStream = new MediaStream();
            let currentIndex = index;
            if (pc) {
                pc.ontrack = (event: RTCTrackEvent) => {
                    event.streams[0].getTracks().forEach((track) => {
                        remoteStream.addTrack(track);
                    });
                    const videoElement = document.getElementById(
                        `participantVideo${currentIndex}`
                    ) as HTMLVideoElement;
                    if (videoElement) videoElement.srcObject = remoteStream;
                };
            }

            return (
                <Participant
                    streamInfos={streamInfos.current}
                    currentParticipant={currentUserData as ParticipantInfo}
                    clearStreamData={clearStreamData}
                    showStreamerControls={true}
                    curentIndex={participantKeys.length}
                    hideVideo={!!screenPresenter && !currentUserData?.screen}
                    videoRef={videoRef as React.RefObject<HTMLVideoElement>}
                    showAvatar={!!(currentUserData && !currentUserData.video && !currentUserData.screen)}
                    currentUser={true}
                />
            );
        }
        return null;
    });

    participantElements?.forEach((p) => {
        if (
            p?.props?.curentIndex === 0 &&
            p?.props?.currentParticipant?.name !== "Guest"
        ) {
            dispatch(setIsStreamer(true));
        }
    });

    return (
        <div className="participants">
            {!isStreamer && participantElements}
            {isStreamer && (
                <Participant
                    streamInfos={streamInfos.current}
                    currentParticipant={currentUserData}
                    clearStreamData={clearStreamData}
                    showStreamerControls={true}
                    curentIndex={participantKeys.length}
                    hideVideo={screenPresenter && !currentUserData?.screen}
                    videoRef={videoRef}
                    showAvatar={
                        currentUserData &&
                        !currentUserData.video &&
                        !currentUserData.screen
                    }
                    currentUser={true}
                />
            )}
        </div>
    );
};

export default Participants;