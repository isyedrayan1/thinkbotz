import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB2W98ieelum4UzF4s1_wLkrfxl9aqii9I",
  authDomain: "db-clgass.firebaseapp.com",
  projectId: "db-clgass",
  storageBucket: "db-clgass.firebasestorage.app",
  messagingSenderId: "412605777727",
  appId: "1:412605777727:web:dd6a37daeefe525077b58a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firestore instance
export const db = getFirestore(app);