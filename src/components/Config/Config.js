// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQcdjdlZ6k3tpBeuXz6RsSMYkoUvvPXLI",
  authDomain: "audity-edc9c.firebaseapp.com",
  projectId: "audity-edc9c",
  storageBucket: "audity-edc9c.appspot.com",
  messagingSenderId: "962875301740",
  appId: "1:962875301740:web:bf594efda827489a231d49",
  measurementId: "G-N95E64LGPH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app)
const provider= new GoogleAuthProvider();
export {auth, provider}