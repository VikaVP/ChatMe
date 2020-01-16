import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
const firebaseConfig = {
  apiKey: 'AIzaSyDHLzHzfPyfSIljNRL1aw8zXqdPohRFTFo',
  authDomain: 'database1-4a58d.firebaseapp.com',
  databaseURL: 'https://database1-4a58d.firebaseio.com',
  projectId: 'database1-4a58d',
  storageBucket: 'database1-4a58d.appspot.com',
  messagingSenderId: '459135140701',
  appId: '1:459135140701:web:614691ac9cc1a3d25a1eb4',
  measurementId: 'G-N7K7BQ7L77',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase;
