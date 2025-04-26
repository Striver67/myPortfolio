import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc, updateDoc, increment } from "firebase/firestore";

// Your Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyC-DjxEVYyCFzH419JzbCWdLDOaQu6NRHg",
    authDomain: "visitor-counter-473ae.firebaseapp.com",
    // databaseURL: "https://visitor-counter-473ae.firebaseio.com",
    projectId: "visitor-counter-473ae",
    storageBucket: "visitor-counter-473ae.firebasestorage.app",
    messagingSenderId: "996857401357",
    appId: "1:996857401357:web:399a27f92c092aabf9c544",
    measurementId: "G-6ZMZF16K3B"
  };

  const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, doc, getDoc, setDoc, updateDoc, increment };