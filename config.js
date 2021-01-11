import firebase from 'firebase';
require('@firebase/firestore');

var firebaseConfig = {
    apiKey: "AIzaSyDq2Zcg20cZF8ItU_9mDuo__VNj2Y2y-lM",
    authDomain: "image-finder-67083.firebaseapp.com",
    projectId: "image-finder-67083",
    storageBucket: "image-finder-67083.appspot.com",
    messagingSenderId: "169529066650",
    appId: "1:169529066650:web:08ff60d849d85259ab0b23"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();