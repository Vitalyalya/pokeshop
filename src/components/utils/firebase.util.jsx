import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAOXaNrPDFiWR2AUCKLjbkIuMAw0a4d4TM",
  authDomain: "pokeshop-71f0c.firebaseapp.com",
  projectId: "pokeshop-71f0c",
  storageBucket: "pokeshop-71f0c.appspot.com",
  messagingSenderId: "629147629424",
  appId: "1:629147629424:web:06d113a923c734569181b5",
};

initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;
  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;

    console.log(userAuth);

    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        orders: [],
        ...additionalInformation,
      });
      // console.log(userDocRef);
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => {
  await signOut(auth);
  localStorage.removeItem("user");
  console.log("signed out");
};

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);

export const getUserDocs = async (userAuth) => {
  const docRef = doc(db, "users", userAuth.uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  }
};

export const addOrder = async (order, userAuth) => {
  // console.log(order);

  const userDocRef = doc(db, "users", userAuth.uid);

  const docSnap = await getDoc(userDocRef);

  let docWithNewOrder = docSnap.data().orders;

  if (typeof docWithNewOrder !== "object") {
    docWithNewOrder = [];
  }

  // JSON.parse(docWithNewOrder);

  console.log(typeof docWithNewOrder);

  const date = new Date().toISOString().slice(0, -5);

  order.unshift({ date });

  docWithNewOrder.push(JSON.stringify(order));

  await setDoc(userDocRef, { orders: docWithNewOrder }, { merge: true });
};
