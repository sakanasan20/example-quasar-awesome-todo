import firebase from "firebase/compat/app"
import 'firebase/compat/database'
import 'firebase/compat/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCT-ihICwHwmG-cYk9tYmGgZN4i2G-0H8E",
  authDomain: "example-quasar-awesome-todo.firebaseapp.com",
  databaseURL: "https://example-quasar-awesome-todo-default-rtdb.firebaseio.com",
  projectId: "example-quasar-awesome-todo",
  storageBucket: "example-quasar-awesome-todo.appspot.com",
  messagingSenderId: "487181710331",
  appId: "1:487181710331:web:3857da93bb206908e7d15e",
  measurementId: "G-JNY008ZMQB"
}

firebase.initializeApp(firebaseConfig)
const auth = firebase.auth()

export {
  auth
}
