import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
    createOffer,
    initializeListensers,
    updatePreference
} from "../../streamingServer/peerConnection";
import type { LiveStreamState, Participant } from "../types/liveStream";

const servers = {
    iceServers: [
        {
            urls: ["stun:stun1.l.google.com:19302",
                "stun:stun2.l.google.com:19302",
                "stun:stun.l.google.com:19302",
                "stun:stun3.l.google.com:19302",
                "stun:stun4.l.google.com:19302",
                "stun:stun.services.mozilla.com"
            ],
            iceCandidatePoolSize: 10,
        }
    ]
}

const addConnection = (
    newUser: Record<string, Participant>,
    currentUser: Record<string, Participant>,
    stream: MediaStream
) => {
    const peerConnection = new RTCPeerConnection(servers);
    stream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, stream);
    });

    const newUserId = Object.keys(newUser)[0];
    const currentUserId = Object.keys(currentUser)[0];
    const offerIds = [newUserId, currentUserId].sort((a, b) =>
        a.localeCompare(b)
    );

    newUser[newUserId].peerConnection = peerConnection;
    if (offerIds[0] !== currentUserId) {
        createOffer(peerConnection, offerIds[0], offerIds[1]);
    }
    return newUser;
};

const generateColor = () =>
    "#" + Math.floor(Math.random() * 16777215).toString(16);

const initialState: LiveStreamState = {
    mainStream: null,
    participants: {},
    currentUser: null,
    isStreamer: false,
    streamer: null,
    HTMLParticipants: {},
    streamId: null,
};

const liveStreamSlice = createSlice({
    name: "liveStream",
    initialState,
    reducers: {
        setMainStream(state, action: PayloadAction<MediaStream>) {
            state.mainStream = action.payload;
        },
        setUser(state, action: PayloadAction<Record<string, Participant>>) {
            const userId = Object.keys(action.payload)[0];
            action.payload[userId].avatarColor = generateColor();
            initializeListensers(userId);
            state.currentUser = { ...action.payload };
        },
        addParticipant(state, action: PayloadAction<Record<string, Participant>>) {
            const currentUserId = Object.keys(state.currentUser || {})[0];
            const newUserId = Object.keys(action.payload)[0];
            let newUser = { ...action.payload };
            if (state.mainStream && currentUserId !== newUserId) {
                newUser = addConnection(newUser, state.currentUser!, state.mainStream);
            }

            if (currentUserId === newUserId) {
                newUser[newUserId].currentUser = true;
            }

            newUser[newUserId].avatarColor = generateColor();
            state.participants = { ...state.participants, ...newUser };
        },
        removeParticipant(state, action: PayloadAction<string>) {
            delete state.participants[action.payload];
        },
        updateUser(state, action: PayloadAction<Participant>) {
            if (!state.currentUser) return;
            const userId = Object.keys(state.currentUser)[0];
            updatePreference(userId, action.payload);
            state.currentUser[userId] = {
                ...state.currentUser[userId],
                ...action.payload
            }
        },
        updateParticipant(state, action: PayloadAction<Record<string, Participant>>) {
            const newUserId = Object.keys(action.payload)[0];
            const existedUser = state.participants[newUserId];
            state.participants[newUserId] = {
                ...existedUser,
                ...action.payload[newUserId]
            }
        },
        setIsStreamer(state, action: PayloadAction<boolean>) {
            state.isStreamer = action.payload;
        },
        setStreamer(state, action: PayloadAction<any>) {
            state.streamer = action.payload;
        },
        setStreamId(state, action: PayloadAction<string>) {
            state.streamId = action.payload;
        },
    }
});

export const {
    setMainStream,
    setUser,
    addParticipant,
    removeParticipant,
    updateUser,
    updateParticipant,
    setIsStreamer,
    setStreamer,
    setStreamId,
} = liveStreamSlice.actions;

export default liveStreamSlice.reducer;