// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore  } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAP4mK8D19Ny8-9ARDRS4kyQawBhcq5bfM",
  authDomain: "journal-app-react-20945.firebaseapp.com",
  projectId: "journal-app-react-20945",
  storageBucket: "journal-app-react-20945.appspot.com",
  messagingSenderId: "906860636252",
  appId: "1:906860636252:web:398fbfdb4b13a9bae49e99"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);