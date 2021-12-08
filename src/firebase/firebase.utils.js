import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {
    apiKey: "AIzaSyAW1uqBd2xCUI-db400oAAOhnH59WZR23U",
    authDomain: "crwn-db-82ecf.firebaseapp.com",
    projectId: "crwn-db-82ecf",
    storageBucket: "crwn-db-82ecf.appspot.com",
    messagingSenderId: "562168147753",
    appId: "1:562168147753:web:8d0fd8ea670a44f01f1138",
    measurementId: "G-VS2112S7Y3"
  };

  firebase.initializeApp(config);

  export const createUserProfileDocument = async (userAuth, additionalData)=>{
      if(!userAuth)return;

      const userRef = firestore.doc(`users/${userAuth.uid}`);

      const snapShot = await userRef.get();

      if(!snapShot.exists){
          const {displayName, email} = userAuth;
          const createdAt = new Date();

          try{
            await userRef.set({
                displayName, 
                email,
                createdAt,
                ...additionalData
            })
          } catch(error){
            console.log('error creating user', error.message);
          }
      }

      return userRef;
  };


  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt:'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;