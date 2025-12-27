// src/components/auth/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBhL-r8QCtYk8JUTPvQoDC0QiMDsI29tNY",
  authDomain: "icctutorlink.firebaseapp.com",
  projectId: "icctutorlink",
  storageBucket: "icctutorlink.firebasestorage.app",
  messagingSenderId: "426973651496",
  appId: "1:426973651496:web:84d9fd2d3e1436f4974b1d"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);

export default firebaseApp;
