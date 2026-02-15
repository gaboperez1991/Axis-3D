// src/firebase/config.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDgC9os7y0HG0dvOwE9t1MVDtEfikurg9k",
  authDomain: "axis-3d-6656d.firebaseapp.com",
  projectId: "axis-3d-6656d",
  storageBucket: "axis-3d-6656d.firebasestorage.app",
  messagingSenderId: "1021660464103",
  appId: "1:1021660464103:web:4cd28b05edf3b1fb57f342",
  measurementId: "G-V9M4REHYMM",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
