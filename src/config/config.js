import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
import {
  apiKey,
  authDomain,
  databaseURL,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
  measurementId,
} from 'react-native-dotenv';
const firebaseConfig = {
  apiKey: `${apiKey}`,
  authDomain: `${authDomain}`,
  databaseURL: `${databaseURL}`,
  projectId: `${projectId}`,
  storageBucket: `${storageBucket}`,
  messagingSenderId: `${messagingSenderId}`,
  appId: `${appId}`,
  measurementId: `${measurementId}`,
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase;
