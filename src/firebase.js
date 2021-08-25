import firebase from 'firebase'
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC1X7r3p0sdJzrpYPxrFbRQRunJaRd0yyA",
    authDomain: "whatsapp-clone-617f5.firebaseapp.com",
    projectId: "whatsapp-clone-617f5",
    storageBucket: "whatsapp-clone-617f5.appspot.com",
    messagingSenderId: "48478338199",
    appId: "1:48478338199:web:7c88a0537a62eaa6d9bdd2",
    measurementId: "G-B6VJY21P3Y"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();
  export {auth,provider};
  export default db; 