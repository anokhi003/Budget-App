import firebase from 'firebase/compat/app';
import "firebase/compat/database";

const firebaseConfig = {
    apiKey: "AIzaSyBkgmX5gomPwIHuPd9OrymvQIBJnSk25XA",
    authDomain: "budget-app-7b116.firebaseapp.com",
    databaseURL: "https://budget-app-7b116-default-rtdb.firebaseio.com",
    projectId: "budget-app-7b116",
    storageBucket: "budget-app-7b116.appspot.com",
    messagingSenderId: "556779117269",
    appId: "1:556779117269:web:4b773acb1b6254eef8205c",
    measurementId: "G-KTH3G5QVQ1"
  };

  // Initialize Firebase
const fireDb = firebase.initializeApp(firebaseConfig);


export default fireDb ;


// export default fireDb;

