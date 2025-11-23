import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getEnv } from "./getEnv";

const firebaseConfig = {
  apiKey: getEnv('VITE_FIREBASE_API'),
  authDomain: "abhay-raghav.firebaseapp.com",
  projectId: "abhay-raghav",
  storageBucket: "abhay-raghav.firebasestorage.app",
  messagingSenderId: "420942191847",
  appId: "1:420942191847:web:8554fca779d95d30791642"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };