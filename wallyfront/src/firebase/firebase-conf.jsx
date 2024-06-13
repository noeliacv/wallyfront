import { initializeApp } from "firebase/app";
import {getAnalytics} from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBNABvrIFLhsvewgvDEbPZvJDWxak_fRTU",
  authDomain: "wallynet10.firebaseapp.com",
  projectId: "wallynet10",
  storageBucket: "wallynet10.appspot.com",
  messagingSenderId: "470723618452",
  appId: "1:470723618452:web:0fa1d75c0664303838b681"
};


const app = initializeApp(firebaseConfig);
const analytics=getAnalytics(app);
export const auth=getAuth(app);
export const db=getFirestore(app);