import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyA_EdaXKzEQ_Yg1YnAl8ikzQDooFirlTis",
  authDomain: "interview-5ac2c.firebaseapp.com",
  projectId: "interview-5ac2c",
  // storageBucket: "your-firebase-storage-bucket",
  // messagingSenderId: "your-firebase-sender-id",
  // appId: "your-firebase-app-id"
}

// init firebase
initializeApp(firebaseConfig)

// init firebase auth
const auth = getAuth()

export { auth }