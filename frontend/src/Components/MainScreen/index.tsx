import { useRef, useEffect } from "react";
import MeetingFooter from "../MeetingFooter";
import Participants from "../Participants";
import { connect } from "react-redux";
import { setMainStream, updateUser } from "../../redux/features/liveStreamSlice"; // ✅ từ slice mới

interface MainScreenProps {
    stream?: MediaStream;
    participants: Record<string, any>;
    currentUser: { audio: boolean; video: boolean; screen: boolean };
    setMainStream: (stream: MediaStream) => void;
    updateUser: (user: Partial<{ audio: boolean; video: boolean; screen: boolean }>) => void;
}

const MainScreen = (props: MainScreenProps) => {
    const participantRef = useRef(props.participants);

    const onMicClick = (micEnabled: boolean) => {
        if (props.stream) {
            props.stream.getAudioTracks()[0].enabled = micEnabled;
            props.updateUser({ audio: micEnabled });
        }
    };

    const onVideoClick = (videoEnabled: boolean) => {
        if (props.stream) {
            props.stream.getVideoTracks()[0].enabled = videoEnabled;
            props.updateUser({ video: videoEnabled });
        }
    };

    useEffect(() => {
        participantRef.current = props.participants;
    }, [props.participants]);

    const updateStream = (stream: MediaStream) => {
        for (let key in participantRef.current) {
            const sender = participantRef.current[key];
            if (sender.currentUser) continue;
            const peerConnection = sender.peerConnection
                .getSenders()
                .find((s: RTCRtpSender) => (s.track ? s.track.kind === "video" : false));
            peerConnection?.replaceTrack(stream.getVideoTracks()[0]);
        }
        props.setMainStream(stream);
    };

    const onScreenShareEnd = async () => {
        const localStream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true,
        });

        localStream.getVideoTracks()[0].enabled = props.currentUser.video;
        updateStream(localStream);
        props.updateUser({ screen: false });
    };

    const onScreenClick = async () => {
        let mediaStream;
        if (navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia) {
            // mediaStream = await navigator.getDisplayMedia({ video: true });
            mediaStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
        } else if (navigator.mediaDevices.getDisplayMedia) {
            mediaStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
        } else {
            mediaStream = await navigator.mediaDevices.getUserMedia({
                // video: { mediaSource: "screen" },
                video: true
            });
        }

        mediaStream.getVideoTracks()[0].onended = onScreenShareEnd;
        updateStream(mediaStream);
        props.updateUser({ screen: true });
    };

    return (
        <div className="wrapper">
            <div className="main-screen">
                <Participants />
            </div>
            <div className="footer">
                <MeetingFooter
                    onScreenClick={onScreenClick}
                    onMicClick={onMicClick}
                    onVideoClick={onVideoClick}
                />
            </div>
        </div>
    );
};

// mapStateToProps
const mapStateToProps = (state: any) => ({
    stream: state.liveStream.mainStream,
    participants: state.liveStream.participants,
    currentUser: state.liveStream.currentUser,
});

const mapDispatchToProps = {
    setMainStream,
    updateUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);
