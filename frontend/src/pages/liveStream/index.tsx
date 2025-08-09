import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Participant from "../Participant";
import firepadRef from "../../streamingServer/firebase";
import { setIsStreamer } from "../../redux/features/liveStreamSlice";
import { RootState } from "../../redux/store";

interface StreamInfos {
  viewersCount?: number;
  uniqueCountedParticipants?: Record<string, number>;
}

const Participants: React.FC = () => {
  const dispatch = useDispatch();
  const { participants, currentUser, mainStream, isStreamer, streamer } =
    useSelector((state: RootState) => state.liveStream);

  const streamInfos = useRef<StreamInfos>({});

  const clearStreamData = () => {
    firepadRef
      .remove()
      .then(() => console.log("All data removed successfully."))
      .catch((error) => console.error("Error removing data:", error));
  };

  const participantRef = firepadRef.child("participants");

  useEffect(() => {
    participantRef.on("value", (snapshot) => {
      if (snapshot.val()) {
        const streamParticipantsNames = Object.values(snapshot.val()).map(
          (item: any) => item?.userName
        );
        streamInfos.current.viewersCount = Object.keys(snapshot.val()).length;
        streamInfos.current.uniqueCountedParticipants = {};
        for (const participant of streamParticipantsNames) {
          streamInfos.current.uniqueCountedParticipants[participant as string] =
            (streamInfos.current.uniqueCountedParticipants[participant as string] || 0) + 1;
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
      videoRef.current.srcObject = mainStream || null;
      videoRef.current.muted = true;
    }
  }, [currentUser, mainStream]);

  const currentUserData = currentUser ? Object.values(currentUser)[0] : null;

  const screenPresenter = participantKeys.find((element) => {
    const currentParticipant = participants[element];
    return currentParticipant?.screen;
  });

  const participantElements = participantKeys.map((element, index) => {
    if (element === firstParticipantKey) {
      const streamerParticipant = participants[firstParticipantKey!];
      const pc = streamerParticipant?.peerConnection;
      const remoteStream = new MediaStream();
      if (pc) {
        pc.ontrack = (event: RTCTrackEvent) => {
          event.streams[0].getTracks().forEach((track) => {
            remoteStream.addTrack(track);
          });
          const videoElement = document.getElementById(
            `participantVideo${index}`
          ) as HTMLVideoElement;
          if (videoElement) videoElement.srcObject = remoteStream;
        };
      }

      return (
        <Participant
          participantKey={element}
          key={index}
          currentParticipant={streamerParticipant}
          curentIndex={index}
          hideVideo={!!screenPresenter && screenPresenter !== element}
          streamInfos={streamInfos.current}
          showAvatar={
            streamerParticipant && !streamerParticipant.video && !streamerParticipant.screen
          }
          clearStreamData={clearStreamData}
          videoRef={videoRef}
        />
      );
    }
    return null;
  });

  participantElements.forEach((p) => {
    if (p?.props?.curentIndex === 0 && p?.props?.currentParticipant?.name !== "Guest") {
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
          hideVideo={!!screenPresenter && !currentUserData?.screen}
          videoRef={videoRef}
          showAvatar={currentUserData && !currentUserData.video && !currentUserData.screen}
          currentUser={true}
        />
      )}
    </div>
  );
};

export default Participants;
