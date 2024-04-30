import firebase from "firebase/compat/app";
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDuWz0nURV6PEa4AX74KfZFejBsj8GObuQ",
    authDomain: "customer-care-app-277f7.firebaseapp.com",
    projectId: "customer-care-app-277f7",
    storageBucket: "customer-care-app-277f7.appspot.com",
    messagingSenderId: "338130906074",
    appId: "1:338130906074:web:6df8caa3ea2dadd23f2ee3"
  };

  firebase.initializeApp(firebaseConfig)

  export default firebase