import { initializeApp } from "firebase/app";
import {getAnalytics} from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAjC2B8zdU4r1kRmif43HAT796u78IYTNc",
  authDomain: "wallynet-7b8a7.firebaseapp.com",
  projectId: "wallynet-7b8a7",
  storageBucket: "wallynet-7b8a7.appspot.com",
  messagingSenderId: "755658435246",
  appId: "1:755658435246:web:d3d2be665a0fc7f554db3f"
};


const app = initializeApp(firebaseConfig);
const analytics=getAnalytics(app);
export const auth=getAuth(app);
export const db=getFirestore(app);