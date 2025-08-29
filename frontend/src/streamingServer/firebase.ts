import firebase from "firebase/compat/app";
import "firebase/compat/database";

const firebaseConfig = {
    databaseURL: "https://video-sharing-35ce0-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export const db = firebase;

let firepadRef = firebase.database().ref();

const urlparams = new URLSearchParams(window.location.search);
const roomId = urlparams.get("id");

if (window.location.href.includes("live-stream")) {
    if (roomId) {
        firepadRef = firepadRef.child(roomId);
    } else {
        firepadRef = firepadRef.push();
        window.history.replaceState(null, "Meet", "?id=" + firepadRef.key);

        window.onbeforeunload = (e) => {
            e.preventDefault();
            e.returnValue = "";

            firepadRef.remove().then(() => {
                console.log("All data removed successfully.");
            });
        };
    }
}

export default firepadRef;