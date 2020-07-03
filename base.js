import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    
        apiKey: "AIzaSyBcA6qe4eWQb8F0_LYOgEVn0HU9LA9-Az0",
        authDomain: "catch-of-the-day---jorge.firebaseapp.com",
        databaseURL: "https://catch-of-the-day---jorge.firebaseio.com",
              
});

const base = Rebase.createClass(firebaseApp.database());

export {firebaseApp};
export default base;
