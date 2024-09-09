import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, initializeAuth, getReactNativePersistence } from 'firebase/auth'; // Import Firebase auth methods
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

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

// Initialize Firebase Auth with AsyncStorage persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Export Firebase services
export { db, collection, addDoc, getDocs, auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged };
