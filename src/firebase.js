import firebase from 'firebase/app'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyAn0457KMNEhTPqIH_Phyv69bTDu4PyebY",
    authDomain: "pokeapp-7132d.firebaseapp.com",
    projectId: "pokeapp-7132d",
    storageBucket: "pokeapp-7132d.appspot.com",
    messagingSenderId: "683226856273",
    appId: "1:683226856273:web:458b63828773e6b0883170"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth();

  export {auth, firebase} //exportamos firebase para poder "alimentar al Provider"