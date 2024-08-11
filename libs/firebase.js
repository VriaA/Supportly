import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB0jI2Q5vVLruhShTxgxLUjPqeIIMmPaqA",
  authDomain: "ai-mental-health-support.firebaseapp.com",
  projectId: "ai-mental-health-support",
  storageBucket: "ai-mental-health-support.appspot.com",
  messagingSenderId: "1001855380788",
  appId: "1:1001855380788:web:c43e254093708b69624961"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };