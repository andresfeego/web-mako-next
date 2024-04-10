// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {GoogleAuthProvider, FacebookAuthProvider, signInWithPopup, getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBVZYlG9TvXD9OFcX7VdVb5x2DIJ8bkQqM",
  authDomain: "web-mako.firebaseapp.com",
  projectId: "web-mako",
  storageBucket: "web-mako.appspot.com",
  messagingSenderId: "550742835640",
  appId: "1:550742835640:web:ba7ad5f4781c7f6112cf4d",
  measurementId: "G-5JYYZXZD6J"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider()
const facebookProvider =  new FacebookAuthProvider()
const auth = getAuth()

export const  authProvider = async (provider) =>{
  const providerSelected = provider == 'google' ? googleProvider : facebookProvider

  try {
    const result = await signInWithPopup(auth, providerSelected)
    console.log(result)
  } catch (error) {
    console.log(error)
  }
}