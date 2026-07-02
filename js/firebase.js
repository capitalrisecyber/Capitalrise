// =====================================
// CapitalRise Firebase Configuration
// File : js/firebase.js
// =====================================

// Firebase Config

const firebaseConfig = {

apiKey: "AIzaSyBxIx1bUqIhB7FzsgEtEw1CWmYLWjby0xI",

authDomain: "capitalrise-a1ce7.firebaseapp.com",

projectId: "capitalrise-a1ce7",

storageBucket: "capitalrise-a1ce7.firebasestorage.app",

messagingSenderId: "491288482764",

appId: "1:491288482764:web:fbb72f2ad8adecdba74369"

};


// Initialize Firebase

firebase.initializeApp(firebaseConfig);


// Firebase Services

const auth = firebase.auth();

const db = firebase.firestore();

const storage = firebase.storage();
// =====================================
// CapitalRise Firebase Configuration
// File : js/firebase.js
// Part : 1B
// =====================================


// Check Firebase Initialization

if (!firebase.apps.length) {

firebase.initializeApp(firebaseConfig);

}


// Firebase Services

const auth = firebase.auth();

const db = firebase.firestore();

const storage = firebase.storage();


// Collections

const USERS_COLLECTION = "users";

const TASKS_COLLECTION = "tasks";

const HISTORY_COLLECTION = "history";

const REDEEM_COLLECTION = "redeem";

const REFERRAL_COLLECTION = "referrals";

const SETTINGS_COLLECTION = "settings";


// Current User

function currentUser(){

return auth.currentUser;

}


// Current UID

function currentUID(){

return auth.currentUser ? auth.currentUser.uid : null;

}


// Current User Document

function currentUserRef(){

return db.collection(USERS_COLLECTION).doc(currentUID());

}


// Server Timestamp

function serverTime(){

return firebase.firestore.FieldValue.serverTimestamp();

}


// Increment Value

function increment(value){

return firebase.firestore.FieldValue.increment(value);

}
// =====================================
// CapitalRise Firebase Configuration
// File : js/firebase.js
// Part : 1C
// =====================================


// Firebase Settings

db.settings({

ignoreUndefinedProperties: true

});


// Authentication Persistence

auth.setPersistence(

firebase.auth.Auth.Persistence.LOCAL

)

.then(()=>{

console.log("Authentication Persistence Enabled");

})

.catch((error)=>{

console.log(error);

});


// Global App Object

const CapitalRise={

auth:auth,

db:db,

storage:storage,

currentUser:currentUser,

currentUID:currentUID,

currentUserRef:currentUserRef,

serverTime:serverTime,

increment:increment

};


// Freeze Object

Object.freeze(CapitalRise);


// App Ready

console.log("====================================");

console.log(" CapitalRise Firebase Connected");

console.log(" Project :", firebaseConfig.projectId);

console.log("====================================");
