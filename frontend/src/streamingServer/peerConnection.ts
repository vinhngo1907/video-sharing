import firepadRef from "./firebase";

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

export const initializeListensers = async(userId: string):Promise<void> => {
    const currentUserRef = participantRef.child(userId);
    
}