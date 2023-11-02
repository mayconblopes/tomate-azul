// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  signInAnonymously,
} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDFubx0Vq1Bvc8AYSHqAqcUo-wfDpWgTEc',
  authDomain: 'tomateazul-dc484.firebaseapp.com',
  projectId: 'tomateazul-dc484',
  storageBucket: 'tomateazul-dc484.appspot.com',
  messagingSenderId: '566380930583',
  appId: '1:566380930583:web:917aa70b4ad95136795e52',
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)
const auth = getAuth()
// console.log('AUTH', auth)

export async function logOut() {
  signOut(auth)
}

export async function signInAnon() {
  const result = signInAnonymously(auth)
    .then(userCredential => {
      // Signed in
      // console.log(userCredential)

      return userCredential.user
    })
    .catch(error => {
      console.log(error)
      return undefined
    })
  return result
}

export async function signIn(email: string, password: string) {
  if (password === process.env.GATSBY_ADM_PWD) {
    let result = await signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // Signed in
        // console.log(userCredential)

        return userCredential.user
      })
      .catch(error => {
        console.log(error)
        return undefined
      })
    return result
  } else {
    throw new Error('ADM não reconhecido pela senha')
  }
}
