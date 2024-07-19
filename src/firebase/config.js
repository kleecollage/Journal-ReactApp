// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore  } from "firebase/firestore/lite";
import { getEnvironments } from "../helpers/getEnvironments";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const {
  VITE_APIKEY,
  VITE_AUTHDOMAIN,
  VITE_PROJECTID,
  VITE_STORAGEBUCKET,
  VITE_MESSAGINGSENDERID,
  VITE_APPID,
} = getEnvironments()

// Your web app's Firebase configuration
// Dev/Prod
const firebaseConfig = {
  apiKey: VITE_APIKEY,
  authDomain: VITE_AUTHDOMAIN,
  projectId: VITE_PROJECTID,
  storageBucket: VITE_STORAGEBUCKET,
  messagingSenderId: VITE_MESSAGINGSENDERID,
  appId: VITE_APPID,
};

// Testing
// const firebaseConfig = {
//   apiKey: "AIzaSyCcEVJvs4A94g4TBfvJXtRrVScJvhPbAFU",
//   authDomain: "proyect-testing-4e51f.firebaseapp.com",
//   projectId: "proyect-testing-4e51f",
//   storageBucket: "proyect-testing-4e51f.appspot.com",
//   messagingSenderId: "677707429934",
//   appId: "1:677707429934:web:e66e0fed6e8746789ac7bf"
// };


// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);