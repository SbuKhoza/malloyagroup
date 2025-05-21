// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBnq9p6fWm_A5CfcxmAiAP1eUpI2a_JYh0",
  authDomain: "base-apparel-63218.firebaseapp.com",
  databaseURL: "https://base-apparel-63218-default-rtdb.firebaseio.com",
  projectId: "base-apparel-63218",
  storageBucket: "base-apparel-63218.firebasestorage.app",
  messagingSenderId: "164383851215",
  appId: "1:164383851215:web:f577a035cb6ba2f1782dba",
  measurementId: "G-20981DQ9E9",
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const analytics = getAnalytics(app)
