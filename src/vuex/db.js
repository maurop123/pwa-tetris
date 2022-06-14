import firebase from 'firebase/app'
import 'firebase/database'
// import 'firebase/firestore'

// Get a Firestore instance
export const firebaseApp = firebase
  .initializeApp({
    apiKey: 'AIzaSyAyqHeGbVxYnXNKrAbtkJ8tkopm76W0kvw',
    authDomain: 'mauro-made-it.firebaseapp.com',
    databaseURL: 'https://mauro-made-it.firebaseio.com'
    // projectId: 'mauro-made-id'
  })
//   .firestore()

export const db = firebaseApp.database().ref('pwa-tetris')
