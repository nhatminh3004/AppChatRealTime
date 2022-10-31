import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

export const firebaseConfig = {
    apiKey: "AIzaSyDqYem6jcReHvSDGriLBFbkDq214Dp-Vu4",
    authDomain: "tesuauthmain.firebaseapp.com",
    projectId: "tesuauthmain",
    storageBucket: "tesuauthmain.appspot.com",
    messagingSenderId: "804345764407",
    appId: "1:804345764407:web:53131d83f5baebe6d4bdb2",
    measurementId: "G-3CF57FRWK6"
  };
  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
  }