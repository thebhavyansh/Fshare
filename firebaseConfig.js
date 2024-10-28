// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDHtZ1qNpv3n77Sengzgff-XjVu_3lyZUg",
  authDomain: "fshare-ee6d8.firebaseapp.com",
  projectId: "fshare-ee6d8",
  storageBucket: "fshare-ee6d8.appspot.com",
  messagingSenderId: "895326572106",
  appId: "1:895326572106:web:cdedaa2142d7b0529ae0b3",
  measurementId: "G-051D1C7E5H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app