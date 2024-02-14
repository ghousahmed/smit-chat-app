import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc, addDoc, collection, query, where, getDocs, onSnapshot, orderBy, serverTimestamp, updateDoc, arrayUnion } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDG6-ZhFAuf2xkIVjieFKPzYXylqsASeXU",
    authDomain: "smit-batch-10.firebaseapp.com",
    databaseURL: "https://smit-batch-10-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "smit-batch-10",
    storageBucket: "smit-batch-10.appspot.com",
    messagingSenderId: "333213670128",
    appId: "1:333213670128:web:b7d83af5afed979bafc035"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {
    auth,
    db,
    createUserWithEmailAndPassword,
    doc,
    setDoc,
    onAuthStateChanged,
    getDoc,
    signOut,
    signInWithEmailAndPassword,
    collection,
    query,
    where,
    getDocs,
    addDoc,
    onSnapshot,
    orderBy,
    serverTimestamp,
    updateDoc,
    arrayUnion
}