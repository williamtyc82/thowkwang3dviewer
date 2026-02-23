import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB__rdJiwW4fKr2PpxY529eXSovUuzWgoI",
    authDomain: "studio-374816510-d4f3d.firebaseapp.com",
    projectId: "studio-374816510-d4f3d",
    storageBucket: "studio-374816510-d4f3d.firebasestorage.app",
    messagingSenderId: "150759802952",
    appId: "1:150759802952:web:36172a802cfd5665ff307d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);
