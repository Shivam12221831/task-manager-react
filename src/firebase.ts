import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged, signInAnonymously, type User } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyD7RNTXX9Rcp8uMCLeT3wDjY4_0qxC_O2U",
    authDomain: "task-manager-react-07.firebaseapp.com",
    projectId: "task-manager-react-07",
    storageBucket: "task-manager-react-07.firebasestorage.app",
    messagingSenderId: "243360553682",
    appId: "1:243360553682:web:1e9a999c68c8b82daceb0b"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

let ensureAuthPromise: Promise<User> | null = null;

export const ensureAuth = async (): Promise<User> => {
  if (auth.currentUser) return auth.currentUser;
  if (!ensureAuthPromise) {
    ensureAuthPromise = (async () => {
      await signInAnonymously(auth);
      return await new Promise<User>((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(
          auth,
          (user) => {
            if (user) {
              unsubscribe();
              resolve(user);
            }
          },
          (error) => {
            unsubscribe();
            reject(error);
          }
        );
      });
    })().finally(() => {
      ensureAuthPromise = null;
    });
  }
  return ensureAuthPromise;
};
