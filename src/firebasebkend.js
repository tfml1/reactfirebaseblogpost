//-------------------------------------------------------------------------------------------------------

// auth imports
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

// firestore db import
import { getFirestore } from "firebase/firestore";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPtXKsbH73vF3RkT-5WiLYW5bkm3zzUEg",
  authDomain: "blogpost-288aa.firebaseapp.com",
  projectId: "blogpost-288aa",
  storageBucket: "blogpost-288aa.appspot.com",
  messagingSenderId: "1027816319104",
  appId: "1:1027816319104:web:2b7b2c18d356508339de65",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//------------------------------------------------------------------------

// initialise firestore database
export const db = getFirestore(app);
// initialise authantication
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
