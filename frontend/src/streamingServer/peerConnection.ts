import firepadRef from "./firebase";
import store from "../redux/store";
const participantRef = firepadRef.child("participants");

export interface Preference {
    audio?: boolean;
    video?: boolean;
    [key: string]: any;
}

export const updatePreference = (userId: string, preference: Preference): void => {
    const currentParticipantRef = participantRef.child(userId).child("preferences");
    setTimeout(() => {
        currentParticipantRef.update(preference);
    });
};

export const createOffer = async (
    peerConnection: RTCPeerConnection,
    receiverId: string,
    createdID: string
): Promise<void> => {
    const currentParticipantRef = participantRef.child(receiverId);
    peerConnection.onicecandidate = (event: RTCPeerConnectionIceEvent) => {
        if (event.candidate) {
            currentParticipantRef.child("offerCandiates")
                .push({ ...event.candidate.toJSON(), userId: createdID });
        }
    };

    const offerDescription = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offerDescription);

    const offer = {
        sdp: offerDescription.sdp || "",
        type: offerDescription.type,
        userId: createdID,
    }

    await currentParticipantRef.child("offers").push().set({ offer });
};

export const initializeListensers = async (userId: string): Promise<void> => {
    const currentUserRef = participantRef.child(userId);
    currentUserRef.child("offers").on("child_added", async (snapshot) => {
        const data = snapshot.val();
        if (data?.offer) {
            const pc = store.getState().liveStream.participants[data.offer.userId]?.peerConnection;
            if (pc) {
                pc.addIceCandidate(new RTCIceCandidate(data));
            }
        }
    });
};

const createAnswer = async (otherUserId: string, userId: string): Promise<void> => {
    const pc = store.getState().liveStream.participants[otherUserId].peerConnection;
    const participantRef1 = participantRef.child(otherUserId);
    if (!pc) return;
    pc.onicecandidate = (event: RTCPeerConnectionIceEvent) => {
        if (event.candidate) {
            participantRef1
                .child("answerCandidates")
                .push({ ...event.candidate.toJSON(), userId: userId });
        }
    };
    const answerDescription = await pc.createAnswer();
    await pc.setLocalDescription(answerDescription);

    const answer = {
        type: answerDescription.type,
        sdp: answerDescription.sdp || "",
        userId: userId,
    };

    await participantRef1.child("answers").push().set({ answer });
};