// src/components/MeetingFooter/MeetingFooter.tsx
import React, { useEffect, useState } from "react";
import {
    FaDesktop,
    FaMicrophone,
    FaMicrophoneSlash,
    FaVideo,
    FaVideoSlash,
} from "react-icons/fa";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "./MeetingFooter.css";
import { useAppSelector } from "../../hooks/reduxHooks";

interface MeetingFooterProps {
    onScreenClick: (setScreenState: (isEnabled: boolean) => void) => void;
    onMicClick: (micEnabled: boolean) => void;
    onVideoClick: (videoEnabled: boolean) => void;
}

interface StreamState {
    mic: boolean;
    video: boolean;
    screen: boolean;
}

const MeetingFooter: React.FC<MeetingFooterProps> = ({
    onScreenClick,
    onMicClick,
    onVideoClick,
}) => {
    const isStreamer = useAppSelector(
        (state) => state.liveStream.isStreamer
    );

    const [streamState, setStreamState] = useState<StreamState>({
        mic: true,
        video: false,
        screen: false,
    });

    const micClick = () => {
        setStreamState((currentState) => ({
            ...currentState,
            mic: !currentState.mic,
        }));
    };

    const videoClick = () => {
        setStreamState((currentState) => ({
            ...currentState,
            video: !currentState.video,
        }));
    };

    const screenClick = () => {
        onScreenClick(setScreenState);
    };

    const setScreenState = (isEnabled: boolean) => {
        setStreamState((currentState) => ({
            ...currentState,
            screen: isEnabled,
        }));
    };

    useEffect(() => {
        onMicClick(streamState.mic);
    }, [streamState.mic, onMicClick]);

    useEffect(() => {
        onVideoClick(streamState.video);
    }, [streamState.video, onVideoClick]);

    return (
        <>
            {isStreamer && (
                <div className="meeting-footer">
                    <div
                        className={`meeting-icons ${!streamState.mic ? "active" : ""}`}
                        title={streamState.mic ? "Mute Audio" : "Unmute Audio"}
                        onClick={micClick}
                    >
                        {streamState.mic ? (
                            <FaMicrophone size={22} />
                        ) : (
                            <FaMicrophoneSlash size={22} />
                        )}
                    </div>
                    <div
                        className={`meeting-icons ${!streamState.video ? "active" : ""}`}
                        title={streamState.video ? "Hide Video" : "Show Video"}
                        onClick={videoClick}
                    >
                        {streamState.video ? (
                            <FaVideo size={22} />
                        ) : (
                            <FaVideoSlash size={22} />
                        )}
                    </div>
                    <div
                        className="meeting-icons"
                        title="Share Screen"
                        onClick={screenClick}
                    >
                        <FaDesktop size={22} />
                    </div>
                    <ReactTooltip />
                </div>
            )}
        </>
    );
};

export default MeetingFooter;