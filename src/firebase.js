import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCqEDRGNsP8WC1ruZw14ZPPCMPCJzSJ2gM",
  authDomain: "examproject-fdf02.firebaseapp.com",
  projectId: "examproject-fdf02",
  storageBucket: "examproject-fdf02.appspot.com",
  messagingSenderId: "805891243853",
  appId: "1:805891243853:web:96b7bcef9124244b1c0104",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// brug af getAuth, for at logge ind, logge ud og oprette bruger
export const auth = getAuth();

export const storage = getStorage(app);
