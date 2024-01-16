import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
export const firebaseConfig = {
  apiKey: "AIzaSyA6OGWqOXDpuhlNafe9Eqszut34Vw6kQI8",
  authDomain: "uploadimagestorage-785cf.firebaseapp.com",
  projectId: "uploadimagestorage-785cf",
  storageBucket: "uploadimagestorage-785cf.appspot.com",
  messagingSenderId: "711078869994",
  appId: "1:711078869994:web:193a102cbed43d865c1093",
  measurementId: "G-RFD19BZRN8"
  };
  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
  }
  export {firebase}