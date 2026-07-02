const db = firebase.firestore();

const uid = localStorage.getItem("capitalrise_uid");

const taskContainer = document.getElementById("taskContainer");

const progressBar = document.getElementById("progressBar");

const progressText = document.getElementById("progressText");

const todayCoins = document.getElementById("todayCoins");

const tasks=[

{

id:1,

title:"Daily Login",

description:"Open CapitalRise today.",

reward:5,

icon:"assets/icons/gift.svg"

},

{

id:2,

title:"Visit Dashboard",

description:"Visit your dashboard once.",

reward:5,

icon:"assets/icons/home.svg"

},

{

id:3,

title:"Open Wallet",

description:"Open wallet section.",

reward:10,

icon:"assets/icons/wallet.svg"

},

{

id:4,

title:"Refer Friends",

description:"Share your referral code.",

reward:20,

icon:"assets/icons/refer.svg"

},

{

id:5,

title:"Complete Profile",

description:"Update your profile details.",

reward:15,

icon:"assets/icons/profile.svg"

},

{

id:6,

title:"Daily Check-In",

description:"Claim today's bonus.",

reward:8,

icon:"assets/icons/gift.svg"

},

{

id:7,

title:"Read Notification",

description:"Open notifications.",

reward:5,

icon:"assets/icons/notification.svg"

},

{

id:8,

title:"Visit Settings",

description:"Open settings page.",

reward:5,

icon:"assets/icons/settings.svg"

},

{

id:9,

title:"Reward History",

description:"Open history section.",

reward:10,

icon:"assets/icons/gift.svg"

},

{

id:10,

title:"Invite Bonus",

description:"Share app with friends.",

reward:25,

icon:"assets/icons/refer.svg"

}

];

let completed=0;

let earnedCoins=0;
function renderTasks(){

taskContainer.innerHTML="";

tasks.forEach(task=>{

const card=document.createElement("div");

card.className="task-card";

card.innerHTML=`

<div class="task-left">

<div class="task-icon">

<img src="${task.icon}">

</div>

<div class="task-info">

<h3>${task.title}</h3>

<p>${task.description}</p>

<span class="reward">

+${task.reward} Coins

</span>

</div>

</div>

<button

class="claim-btn"

id="task${task.id}">

Claim

</button>

`;

taskContainer.appendChild(card);

const btn=document.getElementById(

`task${task.id}`

);

btn.onclick=function(){

claimTask(task,btn);

};

});

loadProgress();

}

async function loadProgress(){

const userRef=db.collection("users").doc(uid);

const doc=await userRef.get();

if(!doc.exists){

return;

}

const data=doc.data();

completed=data.completedTasks||0;

earnedCoins=data.todayCoins||0;

todayCoins.innerHTML=

earnedCoins+" Coins";

progressText.innerHTML=

completed+" / "+tasks.length;

progressBar.style.width=

(completed/tasks.length)*100+"%";

}
async function claimTask(task,btn){

try{

btn.disabled=true;

btn.innerHTML="Claiming...";

const userRef=db.collection("users").doc(uid);

const doc=await userRef.get();

if(!doc.exists){

alert("User not found");

btn.disabled=false;

btn.innerHTML="Claim";

return;

}

const data=doc.data();

const claimed=data.claimedTasks||[];

if(claimed.includes(task.id)){

btn.innerHTML="Completed";

btn.classList.add("completed");

return;

}

await userRef.update({

wallet:firebase.firestore.FieldValue.increment(task.reward),

coins:firebase.firestore.FieldValue.increment(task.reward),

todayCoins:firebase.firestore.FieldValue.increment(task.reward),

completedTasks:firebase.firestore.FieldValue.increment(1),

claimedTasks:firebase.firestore.FieldValue.arrayUnion(task.id)

});

await db.collection("transactions").add({

uid:uid,

amount:task.reward,

type:"credit",

title:task.title,

date:firebase.firestore.FieldValue.serverTimestamp()

});

btn.innerHTML="Completed";

btn.classList.add("completed");

loadProgress();

alert("+"+task.reward+" Coins Added");

}

catch(error){

alert(error.message);

btn.disabled=false;

btn.innerHTML="Claim";

}

}

renderTasks();
