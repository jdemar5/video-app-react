
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"

const firebaseConfig = {
  apiKey: `${process.env.FireBase}`,
  authDomain: "video-64c39.firebaseapp.com",
  projectId: "video-64c39",
  storageBucket: "video-64c39.appspot.com",
  messagingSenderId: "370142218829",
  appId: "1:370142218829:web:a44770ba19d39b714eaa04",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const provider = new GoogleAuthProvider();
export default app;