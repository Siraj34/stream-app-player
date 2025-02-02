// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
////import { getAnalytics } from 'firebase/analytics'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirebase, getFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBV7M_ZcHtJ4qjVivjDZIsfIVKGJufY6d4',
  authDomain: 'video-app-93417.firebaseapp.com',
  projectId: 'video-app-93417',
  storageBucket: 'video-app-93417.appspot.com',
  messagingSenderId: '14802781372',
  appId: '1:14802781372:web:bb4a34b0cee102e447fcb9',
  measurementId: 'G-PNRRS0LCLW',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
//const analytics = getAnalytics(app)
//const auth = getAuth(app)
//const provider = new GoogleAuthProvider()
//export const storage = getStorage(app)
export default app