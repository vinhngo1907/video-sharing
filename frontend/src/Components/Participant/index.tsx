import React, { useEffect, type RefObject } from "react";
import "./Participant.css";
import {
    FaBan,
    FaMicrophoneSlash,
    FaRegCopy,
    FaRegStopCircle,
} from "react-icons/fa";
import firepadRef from "../../streamingServer/firebase";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import Card from "../Card";
import { deleteVideo } from "../../services/video";

interface ParticipantInfo {
    name?: string;
    audio?: boolean;
}

interface StreamInfos {
    viewersCount?: number;
    uniqueCountedParticipants?: Record<string, number>;
}

interface ParticipantProps {
    participantKey: string; // 🔹 bắt buộc có participantKey
    curentIndex: number;
    currentParticipant?: ParticipantInfo;
    hideVideo?: boolean | string;
    // videoRef?: RefObject<HTMLVideoElement>;
    videoRef?: React.RefObject<HTMLVideoElement>;
    showAvatar?: boolean;
    currentUser?: boolean;
    clearStreamData: () => void;
    showStreamerControls?: boolean;
    streamInfos?: StreamInfos;
}

const Participant: React.FC<ParticipantProps> = ({
    participantKey,
    curentIndex,
    currentParticipant,
    hideVideo,
    videoRef,
    showAvatar,
    currentUser,
    clearStreamData,
    showStreamerControls,
    streamInfos,
}) => {
    const isStreamer = useSelector(
        (state: RootState) => state.liveStream.isStreamer
    );
    const streamId = useSelector(
        (state: RootState) => state.liveStream.streamId
    );

    if (!currentParticipant) return null;

    useEffect(() => {
        if (isStreamer) {
            window.onunload = (e: any) => {
                e.preventDefault();
                e.returnValue = "";
                firepadRef.remove().then(() => {
                    console.log("All data removed successfully.");
                });
            };
            window.onbeforeunload = (e) => {
                e.preventDefault();
                e.returnValue = "";
                if (streamId) {
                    deleteVideo(streamId).then((res) => console.log(res));
                }
            };
        }
    }, [isStreamer, streamId]);

    return (
        <div className={`participant ${hideVideo ? "hide" : ""} flex flex-wrap`}>
            <Card>
                <video
                    ref={videoRef}
                    className="video"
                    id={`participantVideo${curentIndex}`}
                    autoPlay
                    playsInline
                ></video>
                {!currentParticipant.audio && (
                    <FaMicrophoneSlash className="muted" title="Muted" />
                )}
                {showAvatar && (
                    <div className="avatar">
                        <FaBan />
                    </div>
                )}
                <div className="name">
                    {currentParticipant?.name}{" "}
                    <span className="text-xs text-gray-400">
                        [{participantKey}]
                    </span>
                    {currentUser ? ` (You)` : ``}
                </div>
            </Card>

            <div className="fixed left-[-120px] flex justify-center items-center gap-2 transition-all duration-300">
                <div className="participantsList flex flex-col bg-pink-400 px-4 py-2 rounded-r-md border-white border-[1px] overflow-auto">
                    {Object.entries(streamInfos?.uniqueCountedParticipants || {}).map(
                        ([key, count], index) => (
                            <div
                                className="text-white bg-pink-700 px-2 py-1 rounded my-[2px] border-pink-900 border-[1px]"
                                key={index}
                            >
                                ({count}) {key}
                            </div>
                        )
                    )}
                </div>

                <button
                    className="text-white font-medium bg-pink-600 hover:bg-pink-800 rounded-md px-2 py-1 transition-all border-pink-600 border-2"
                    onClick={(e) => {
                        e.preventDefault();
                        const parent = (e.target as HTMLElement).parentElement!;
                        if (parent.style.left === "-120px") {
                            (e.target as HTMLElement).innerHTML = "X";
                            parent.style.left = "-1px";
                        } else {
                            parent.style.left = "-120px";
                            (e.target as HTMLElement).innerHTML = "Participants list";
                        }
                    }}
                >
                    Participants list
                </button>

                {showStreamerControls && (
                    <div className="flex fixed right-[2%]">
                        <button
                            onClick={() => {
                                const confirmEnding = window.confirm(
                                    "Are you sure you want to end the live 🟥"
                                );
                                if (confirmEnding && streamId) {
                                    clearStreamData();
                                    deleteVideo(streamId).then((res) => console.log(res));
                                    window.location.replace("/");
                                }
                            }}
                            className="text-white bg-red-600 hover:bg-red-800 rounded-md ml-4 px-2 py-1 border-red-600 border-2"
                        >
                            <FaRegStopCircle size={22} />
                        </button>

                        <button
                            className="text-white bg-green-600 hover:bg-green-800 rounded-md ml-4 px-2 py-1 border-green-600 border-2"
                            onClick={() => {
                                navigator.clipboard
                                    .writeText(document.location.href)
                                    .then(() => window.alert("Link Copied!"))
                                    .catch(() => window.alert("Copy error"));
                            }}
                        >
                            <FaRegCopy size={22} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Participant;