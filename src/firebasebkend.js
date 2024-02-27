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
// const firebaseConfig = { apiKey: "YOUR_API_KEY", authDomain: "YOUR_AUTH_DOMAIN", projectId: "YOUR_PROJECT_ID", storageBucket: "YOUR_STORAGE_BUCKET", messagingSenderId: "YOUR_MESSAGING_SENDER_ID", appId: "YOUR_APP_ID", measurementId: "YOUR_MEASUREMENT_ID" }; firebase.initializeApp(firebaseConfig);
// credentials has been removed but rest of the code is accurate)

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//------------------------------------------------------------------------

// initialise firestore database
export const db = getFirestore(app);
// initialise authantication
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();


//----------------------------------------------------------------------------------------------------------------------

/*



    Set up a Firebase project:
    * Create a Firebase project in the Firebase console.
    * Select Add project and provide a name for your project.
    Add a Web app to your Firebase project:
    * In the Firebase console, open Settings > Your apps.
    * Click Add app, then select Web.
    * Provide a nickname for your app and click Register app.
    * Your Firebase configuration data will be displayed, copy it for later use.
    Install Firebase:
    * Install Firebase using npm or yarn:
    npm install firebase
    or
    yarn add firebase
    Set up Google Auth:
    * In the Firebase console, open the Authentication section.
    * On the Sign in method tab, enable the Google sign-in method.
    Add Firebase to your React project:
    * Create a new file named firebase.js in your React project's src folder.
    * Import the Firebase modules in your firebase.js file:
     import firebase from "firebase/app"; 
     import "firebase/auth"; import "firebase/firestore";
    * Initialize the Firebase app using your Firebase configuration data:
    const firebaseConfig = { apiKey: "YOUR_API_KEY", authDomain: "YOUR_AUTH_DOMAIN", projectId: "YOUR_PROJECT_ID", storageBucket: "YOUR_STORAGE_BUCKET", messagingSenderId: "YOUR_MESSAGING_SENDER_ID", appId: "YOUR_APP_ID", measurementId: "YOUR_MEASUREMENT_ID" }; firebase.initializeApp(firebaseConfig);
    * Export the Firebase app instance: db, auth, provider
    Create a Google sign-in button:
    * In your React project, create a new component(page2) for the Google sign-in button.
    * Import the Google sign-in button component:
    js import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
    * Create a GoogleAuthProvider instance and use it to sign in the user:
    js const provider = new GoogleAuthProvider(); 
    const signInWithGoogle = async () => { try { const result = await signInWithPopup(auth, provider); 
    Create a Firebase database:
    * In the Firebase console, open the Database section.
    * Click Create database.
    * Select the Cloud Firestore database type.
    * Select a location for your database.
    Set database rules:
    * In the Firebase console, open the Database > Rules section.
    * Set your database rules to allow read and write access:
    rules_version = '2'; service cloud.firestore { match /databases/{database}/documents { match /{document=**} { allow read, write: if true; } } }
    Add data to the database:
    * Import the Firebase modules in your React component:
    js import { collection, addDoc } from "firebase/firestore";
    * Add data to your database by calling the addDoc method

*/

