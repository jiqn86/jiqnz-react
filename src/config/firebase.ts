import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCWX-jmUm-6zCwxDs72wObLKN3ny1ZK5Vc",
    authDomain: "jiqnz-tweet.firebaseapp.com",
    projectId: "jiqnz-tweet",
    storageBucket: "jiqnz-tweet.appspot.com",
    messagingSenderId: "659264824174",
    appId: "1:659264824174:web:ef118276221dd28f2a177f"  
  };

const Firebase = firebase.initializeApp(firebaseConfig);

export const Providers = {
    google: new firebase.auth.GoogleAuthProvider()
};

export const firestore = firebase.firestore(Firebase);

export const auth = firebase.auth();
export default Firebase;
  