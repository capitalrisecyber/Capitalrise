// =====================================
// CapitalRise Authentication
// File : js/auth.js
// Part : 1A
// =====================================


// Login Check

auth.onAuthStateChanged(function(user){

if(user){

console.log("User Logged In :", user.uid);

}else{

const page=window.location.pathname.split("/").pop();

const publicPages=[

"index.html",

"login.html",

"otp.html",

"register.html"

];

if(!publicPages.includes(page)){

window.location.replace("login.html");

}

}

});


// Check Login Status

function isLoggedIn(){

return auth.currentUser!=null;

}


// Get Current User

function getCurrentUser(){

return auth.currentUser;

}


// Get Current UID

function getUID(){

return auth.currentUser

? auth.currentUser.uid

: null;

}
// =====================================
// CapitalRise Authentication
// File : js/auth.js
// Part : 1B
// =====================================


// Protect Page (Auto Redirect Handler)

function protectPage(){

auth.onAuthStateChanged(function(user){

const page = window.location.pathname.split("/").pop();

const publicPages = [

"index.html",

"login.html",

"otp.html",

"register.html"

];

if(!user && !publicPages.includes(page)){

window.location.href = "login.html";

}

});

}


// Logout Function

function logout(){

auth.signOut()

.then(()=>{

window.location.href = "login.html";

})

.catch((error)=>{

console.log("Logout Error:", error);

});

}


// Get User Data Helper (Promise Based)

function getUserData(){

return new Promise((resolve,reject)=>{

const user = auth.currentUser;

if(!user){

reject("No user logged in");

return;

}


db.collection("users")

.doc(user.uid)

.get()

.then(doc=>{

if(doc.exists){

resolve(doc.data());

}else{

reject("User data not found");

}

})

.catch(err=>reject(err));

});

}
