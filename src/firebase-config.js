// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBOfBEli4wu5Ly7ts1JLCG8lF1JUvtbPo8",
    authDomain: "tee-times-alerts.firebaseapp.com",
    projectId: "tee-times-alerts",
    storageBucket: "tee-times-alerts.appspot.com",
    messagingSenderId: "1045063183788",
    appId: "1:1045063183788:web:e09250beb6f9a824fade09",
    measurementId: "G-4PF8VY5D2M"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);
