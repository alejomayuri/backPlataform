import firebase from "firebase/compat/app"
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCBZLVm-kvN-Es4EABO0AnfKyjQ-B2iwfE",
  authDomain: "back-plataform.firebaseapp.com",
  projectId: "back-plataform",
  storageBucket: "back-plataform.appspot.com",
  messagingSenderId: "341156181375",
  appId: "1:341156181375:web:1a8df83e008884307cd64a"
};

firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
