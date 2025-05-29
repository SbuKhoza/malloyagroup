// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCm2BWy4yC5E9KVwvY7YF374tgEJww2gj0",
  authDomain: "steady-4edfa.firebaseapp.com",
  projectId: "steady-4edfa",
  storageBucket: "steady-4edfa.appspot.com",
  messagingSenderId: "353114065302",
  appId: "1:353114065302:web:7000e3e9492d77c03c35b7",
  measurementId: "G-WEXYLZWL4G",
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const analytics = getAnalytics(app)
export const db = getFirestore(app)