import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDHBWKZq0qtEIjB1wRBeXaMz0rUgd7dbvo",
  authDomain: "dev-servak.firebaseapp.com",
  projectId: "dev-servak",
  // storageBucket: "your-firebase-storage-bucket",
  // messagingSenderId: "your-firebase-sender-id",
  // appId: "your-firebase-app-id"
}

// init firebase
initializeApp(firebaseConfig)

// init firebase auth
const auth = getAuth()

export { auth }