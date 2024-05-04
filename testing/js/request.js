
let info = [];

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-analytics.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
const firebaseConfig = {
  apiKey: "AIzaSyB5piM8HyYATgWqMPi2U6bwAVz94Q189Bs",
  authDomain: "fir-basics-569a0.firebaseapp.com",
  projectId: "fir-basics-569a0",
  storageBucket: "fir-basics-569a0.appspot.com",
  messagingSenderId: "971203436246",
  appId: "1:971203436246:web:11d5aa9c6a02ee8dc6f377",
  measurementId: "G-LGY93EHL4E",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider();
import {
  getFirestore,
  doc,
  getDoc,
  getDocs, //get all documents inside one collection
  setDoc,
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  deleteField,
  query,
  where,
  orderBy,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
const db = getFirestore();
const auth = getAuth();
const donationRequestCollectionRef = collection(db, "DonationRequests");
let datareguest = [];
document.getElementById("tablebody").innerHTML = "";

getReguests();

async function getReguests() {
  datareguest=[];
  try {
    const q = query(
      donationRequestCollectionRef,
      //   where("status", "==", "pendding"),
      where("centerName", "==", localStorage.getItem("centerName"))
    );
    console.log(q)

    const querySnapshot = await getDocs(q);
    const counter = querySnapshot.size;

    querySnapshot.forEach((doc) => {
      datareguest.push(doc.data());
      datareguest.email = doc.data().email;
    });
    // console.log(datareguest);

    let donationCount = querySnapshot.size;
    // document.getElementById("donation-counter").innerHTML = donationCount;

    // Log or use the 'data' array as needed
  } catch (error) {
    console.error("Error getting documents: ", error);
  }
  filltable();
  //   filltable(datareguest);
}
document.getElementById("spinner").addEventListener("change",()=>{
  const spinner = document.getElementById("spinner");
  
  // Get the selected option
  const selectedOption = spinner.options[spinner.selectedIndex];
  
  // Get the value and text of the selected option
  const selectedValue = selectedOption.value;
  switch (selectedValue) {
    case "pinding":
      getPindingdata();
      break;
    case "accepted":
      getAcceptedData();
      break;
    case "rejected":
      getRejectedData();
      break;
    case "all":
      getReguests();
      break;
    // Add more cases as needed
    default:
    // Code to execute if expression doesn't match any case
  }
  
  // Log the selected value

}) 
  // Get the select element
 

async function filltable() {
  console.log(datareguest);
  document.getElementById("tablebody").innerHTML = '';


  for (let i = 0; i < datareguest.length; i++) {
    console.log(datareguest[i].email);
    let ref = doc(db, "MedicalInfo", datareguest[i].email);
    const docSnap = await getDoc(ref);
    if (docSnap.exists()) {
      info.push(docSnap.data());
      let statusStyle = datareguest[i].status;
      switch (statusStyle) {
        case "pendding":
          statusStyle = "status pending";
          break;
        case "rejected":
          statusStyle = "status return";
          break;
        case "accepted":
          statusStyle = "status delivered";
          break;
        // Add more cases as needed
        default:
        // Code to execute if expression doesn't match any case
      }
      console.log(statusStyle)

      let content = `
      <tr>
      <td >${info[i].firstName + info[0].lastName}</td>
      <td>${datareguest[i].bloodQuantity}</td>
      <td>${info[i].bloodType}</td>
      <td>${datareguest[i].city}</td>
      <td><span class="${statusStyle}">${datareguest[i].status}</span></td>
     <td>${info[i].phoneNumber}</td>
     <td>
     <button onclick="testing('${info[i].firstName}')" style="background-color:blue ;padding:10px;border-radius:5px">more</button>
     </td>
     <td> 
     <div id="done-btn" style="display:flex;justify-content:center ;gap:5px" >
     <button style="background-color:green ;padding:10px;border-radius:5px">     
     accepet
     </button>
     <button style="background-color:red ;padding:10px;border-radius:5px">     
     reject
     </button>

     </div>
    

     <div id="return-btn"></div>
     </td>
     </tr>`;
      document.getElementById("tablebody").innerHTML += content;
    } else {
      console.log("no data");
    }
    // console.log(info);
    
  }
}
async function getPindingdata(){
  datareguest=[]
  try {
    const q = query(
      donationRequestCollectionRef,
         where("status", "==", "pendding"),
      where("centerName", "==", localStorage.getItem("centerName"))
    );
    console.log(q)

    const querySnapshot = await getDocs(q);
    const counter = querySnapshot.size;
    // document.getElementById("users-counter").innerHTML = counter;

    querySnapshot.forEach((doc) => {
      datareguest.push(doc.data());
      datareguest.email = doc.data().email;
    });
    // console.log(datareguest);

    let donationCount = querySnapshot.size;
    // document.getElementById("donation-counter").innerHTML = donationCount;

    // Log or use the 'data' array as needed
  } catch (error) {
    console.error("Error getting documents: ", error);
  }
  filltable();

}
async function getAcceptedData(){
  datareguest=[]
  try {
    const q = query(
      donationRequestCollectionRef,
         where("status", "==", "accepted"),
      where("centerName", "==", localStorage.getItem("centerName"))
    );
    console.log(q)

    const querySnapshot = await getDocs(q);
    const counter = querySnapshot.size;
    // document.getElementById("users-counter").innerHTML = counter;

    querySnapshot.forEach((doc) => {
      datareguest.push(doc.data());
      datareguest.email = doc.data().email;
    });
    // console.log(datareguest);

    let donationCount = querySnapshot.size;
    // document.getElementById("donation-counter").innerHTML = donationCount;

    // Log or use the 'data' array as needed
  } catch (error) {
    console.error("Error getting documents: ", error);
  }
  filltable();

}
async function getRejectedData(){
  datareguest=[]
  try {
    const q = query(
      donationRequestCollectionRef,
         where("status", "==", "rejected"),
      where("centerName", "==", localStorage.getItem("centerName"))
    );
    console.log(q)

    const querySnapshot = await getDocs(q);
    const counter = querySnapshot.size;
    // document.getElementById("users-counter").innerHTML = counter;

    querySnapshot.forEach((doc) => {
      datareguest.push(doc.data());
      datareguest.email = doc.data().email;
    });
    // console.log(datareguest);

    let donationCount = querySnapshot.size;
    // document.getElementById("donation-counter").innerHTML = donationCount;

    // Log or use the 'data' array as needed
  } catch (error) {
    console.error("Error getting documents: ", error);
  }
  filltable();

}
