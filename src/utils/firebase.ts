import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDaVE0d8s2IgK96M9Io9lQDaEjlQA4PSlo",
  authDomain: "websitelist-54571.firebaseapp.com",
  projectId: "websitelist-54571",
  storageBucket: "websitelist-54571.firebasestorage.app",
  messagingSenderId: "1078380199629",
  appId: "1:1078380199629:web:8c2e58f93d40f8e42ef384",
  measurementId: "G-8JRJK1YTP9"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);