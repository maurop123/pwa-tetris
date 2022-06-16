/* Copied from https://github.com/maurop123/vue-commons/blob/master/src/database/Firebase.js */

import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'
import { Observable } from 'rxjs';

export default class {
  constructor({
    config = {
      apiKey: "AIzaSyAyqHeGbVxYnXNKrAbtkJ8tkopm76W0kvw",
      authDomain: "mauro-made-it.firebaseapp.com",
      databaseURL: "https://mauro-made-it.firebaseio.com",
    },
    ref
  }) {
    const firebaseApp = firebase.initializeApp(config)
    this.fb = ref ? firebaseApp.database().ref(ref) : firebaseApp.database()
    this.auth = firebase.auth()
  }

  get(path = '/', toArray = true, once = true) {
    return Observable.create((observer) => {
      const ref = this.fb.child(path)

      const handle = (snap) => {
        if (snap.val()) {
          observer.next(
            (toArray) ? this.objToArr(snap.val()) : snap.val()
          )
        } else {
          observer.next(null)
        }
      }

      if (once) ref.once('value', handle)
      else ref.on('value', handle)
    })
  }

  set(path = '/', payload) {
    return Observable.create(obs => {
      //TODO try fromPromise
      this.fb.child(path).set(payload)
      .then(() => {
        obs.next(payload)
      })
      .catch(err => obs.error(err))
    })
  }

  push(path = '/', payload) {
    const id = this.fb.child(path).push().key
    const newPath = `${path}/${id}`
    return this.set(newPath, { id, ...payload })
  }

  update(path = '/', payload) {
    if (payload.id === undefined) {
      return this.push(path, payload)
    } else {
      path = `${path}/${payload.id}`
      return this.set(path, payload)
    }
  }

  del(path = '/', payload) {
    if (payload.id !== undefined) {
      path = path.split('/').concat(payload.id).join('/')
    }
    return this.set(path, null)
  }

  objToArr(obj) { return Object.keys(obj).map(key => obj[key]) }
}


//
// export const db = Object.assign(
//   {},
//   fb,
//   { get, set, push, update }
// )
//
// export default { db, auth }