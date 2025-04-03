import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAhgbDmC1pEG53D6SN74mWRNoZF2CpAnog",
    authDomain: "moodbloom-5764f.firebaseapp.com",
    projectId: "moodbloom-5764f",
    storageBucket: "moodbloom-5764f.firebasestorage.app",
    messagingSenderId: "818019248793",
    appId: "1:818019248793:web:6849724f6d21923c12a608",
    measurementId: "G-JG0Z7KE4JE"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
