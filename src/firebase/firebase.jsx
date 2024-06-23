import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyCD24LRDyfScOtyJLE2JnHaKPEhc2agFjQ",
  authDomain: "final-react-gallery.firebaseapp.com",
  projectId: "final-react-gallery",
  storageBucket: "final-react-gallery.appspot.com",
  messagingSenderId: "695278872994",
  appId: "1:695278872994:web:2eb8e7b5a25b00aff8eafb",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const imageDB = getStorage(app);
const firestoreDB = getFirestore(app);

export { imageDB, firestoreDB };
