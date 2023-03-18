// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBBaKrUIMsfMziSRJXohgVBZT1XZQU4s7Y",
  authDomain: "finweb1-2bddc.firebaseapp.com",
  projectId: "finweb1-2bddc",
  storageBucket: "finweb1-2bddc.appspot.com",
  messagingSenderId: "48964467307",
  appId: "1:48964467307:web:1b427b40a4f328e3360f2e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

export const storage = getStorage();

export const db = getFirestore(app);