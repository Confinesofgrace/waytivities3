// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, updateDoc, deleteDoc, doc, getDocs } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAVal47jzPR_2t6_FYbHX2Z8jnEzmEB5n0",
  authDomain: "waytivities-2025.firebaseapp.com",
  databaseURL: "https://waytivities-2025-default-rtdb.firebaseio.com",
  projectId: "waytivities-2025",
  storageBucket: "waytivities-2025.firebasestorage.app",
  messagingSenderId: "934820856603",
  appId: "1:934820856603:web:b5cf90df03c240009309be"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc, updateDoc, deleteDoc, doc, getDocs };