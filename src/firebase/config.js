import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

import "firebase/compat/analytics";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCkM7VW_9vyk7_fc_1tq9jrq9YDs9PSVcs",
  authDomain: "messaging-app-f7af3.firebaseapp.com",
  projectId: "messaging-app-f7af3",
  storageBucket: "messaging-app-f7af3.appspot.com",
  messagingSenderId: "165085446361",
  appId: "1:165085446361:web:26682055692bcf25e0fec8",
  measurementId: "G-KMW4N20QQP",
};
// Initialize Firebase

firebase.initializeApp(firebaseConfig);
firebase.analytics();

// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const auth = getAuth();
const db = firebase.firestore();
connectAuthEmulator(auth, "http://localhost:9099");
if (window.location.hostname === "localhost") {
  connectFirestoreEmulator(db, "localhost", 8080);
}
export { db, auth };
export default firebase;
