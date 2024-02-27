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
  apiKey: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  authDomain: "yyyyyyyyyyyy.firebaseapp.com",
  projectId: "yyyyyyyyyyyy",
  storageBucket: "yyyyyyyyyyyy.appspot.com",
  messagingSenderId: "999999999999999",
  appId: "0:1111111111111111:web:222222222222222222",
};
// (note- firebaseConfig is copy paste object from firebase console, when u set up ur project,
// u will get this config object after u set up ur firebase project(create new) and goto (on the left sidebar) prokect overview->project settings->scroll to bottom
// i have removed my credentials but rest of the code is accurate)
// Initialize Firebase
const app = initializeApp(firebaseConfig);
//------------------------------------------------------------------------

// initialise firestore database
export const db = getFirestore(app);
// initialise authantication
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
