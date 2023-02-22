// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore/lite';
const firebaseConfig = {
  apiKey: "AIzaSyC5o3sNOx8G4roTvipTN93EZz1_l6xrm34",
  authDomain: "marketing-agency-474b8.firebaseapp.com",
  projectId: "marketing-agency-474b8",
  storageBucket: "marketing-agency-474b8.appspot.com",
  messagingSenderId: "1076966526160",
  appId: "1:1076966526160:web:721b09d296c91e785762d5",
  measurementId: "G-WE4QRPR8WL"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);