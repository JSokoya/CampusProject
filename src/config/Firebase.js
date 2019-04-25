import * as firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyCO9euSnVFqLf1Zz0A8yx4cgJcrMj0wofU',
  authDomain: 'intaclone-f0d32.firebaseapp.com',
  databaseURL: 'https://intaclone-f0d32.firebaseio.com',
  projectId: 'intaclone-f0d32',
  storageBucket: 'intaclone-f0d32.appspot.com',
  messagingSenderId: '1021636677224'
};

export default class Firebase {
  static auth;
  static storage;
  static database;
  static registrationInfo = {
    email: '',
    password: ''
  };
  // Initialize Firebase
  static init() {
    firebase.initializeApp(config);
    Firebase.auth = firebase.auth();
    Firebase.storage = firebase.storage();
    Firebase.database = firebase.database();
    // Firebase.user = uid => firebase.database().;
    // Firebase.users = () => firebase.database().ref('users');
  }
}
