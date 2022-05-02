import firebase from "firebase"
import "firebase/auth"

const app = firebase.initializeApp({
  apiKey: "AIzaSyDgeWP3WYyZuBj1YRtqW6rU57NauMl6x6Y",
  authDomain: "mechonspot-76d2f.firebaseapp.com",
  projectId: "mechonspot-76d2f",
  storageBucket: "mechonspot-76d2f.appspot.com",
  messagingSenderId: "973601647548",
  appId: "1:973601647548:web:6e2a344932aa5b5c9999b9",
  measurementId: "G-EGLGXFWYSS"
})
const db = firebase.firestore();
const storage = firebase.storage();
// const getStorage = firebase.getStorage();
// const ref = firebase.ref();
// const getDownloadURL = firebase.getDownloadURL();

export { db, storage};

export const auth = app.auth()
export default app
