import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

const {
  API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID,
  MEASUREMENT_ID,
} = process.env;

var firebaseConfig = {
  apiKey: "AIzaSyDJsUubW66v5_HufAicIJhKrd4H3_NQwMs",
  authDomain: "chat-app-a191d.firebaseapp.com",
  projectId: "chat-app-a191d",
  storageBucket: "chat-app-a191d.appspot.com",
  messagingSenderId: "566975045090",
  appId: "1:566975045090:web:5e83852537e476ef326dbb",
  measurementId: "G-HG69LPM6MX",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const auth = firebase.auth();
const db = firebase.firestore();

if (window.location.hostname === "localhost") {
  auth.useEmulator("http://localhost:9099");
  db.useEmulator("localhost", "8080");
}

export { db };
export default firebase;
