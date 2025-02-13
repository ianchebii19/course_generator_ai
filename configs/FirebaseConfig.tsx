// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "aicourse-f9fc2.firebaseapp.com",
  projectId: "aicourse-f9fc2",
  storageBucket: "aicourse-f9fc2.firebasestorage.app",
  messagingSenderId: "237492427108",
  appId: "1:237492427108:web:ca4fc14a3312a6d87c8271",
  measurementId: "G-LGLQ36XV71"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage=getStorage(app)

