// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAhU8eSC3FdsigYOKPrg7WByabONhFFlwM",
  authDomain: "travelcompanion-26240.firebaseapp.com",
  projectId: "travelcompanion-26240",
  storageBucket: "travelcompanion-26240.appspot.com",
  messagingSenderId: "159854020107",
  appId: "1:159854020107:web:3267f531269399f1eb690e",
  measurementId: "G-7038T7WKM4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Export Firestore functions
export { db, collection, addDoc, getDocs };
