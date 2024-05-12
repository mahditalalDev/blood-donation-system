import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyDfrHufsSDuxH1u2DsKx_3H6pWvgdXDcQk",
  authDomain: "blooddoanationsystem.firebaseapp.com",
  projectId: "blooddoanationsystem",
  storageBucket: "blooddoanationsystem.appspot.com",
  messagingSenderId: "1062989139800",
  appId: "1:1062989139800:web:749dc6ad37e88970b45f2d",
  measurementId: "G-9QXN765YNB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

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
const db = getFirestore(app);

//   --------------------------------------------------------------------------------

// Get the radio buttons
const tattooYes = document.getElementById("tattoo-yes");
const medicalYes = document.getElementById("medical_condition-yes");
const medicalNo = document.getElementById("medical_condition-no");
const tattooNo = document.getElementById("tattoo-no");

// Function to handle radio button change
function handleTattooChange() {
  let tattooValue = tattooYes.checked ? "yes" : tattooNo.checked ? "no" : "";
  return tattooValue;
}

// Attach event listeners to radio buttons
tattooYes.addEventListener("change", handleTattooChange);
tattooNo.addEventListener("change", handleTattooChange);
medicalYes.addEventListener("change", handleMedicalChange);
medicalNo.addEventListener("change", handleMedicalChange);

function handleMedicalChange() {
  let medicalValue = medicalYes.checked ? "yes" : medicalNo.checked ? "no" : "";
  return medicalValue;
}
function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  }

// const tattooInput = document.querySelector('input[name="tattoo"]:checked');

getSpecificDocument();
async function getSpecificDocument() {
    const email = getQueryParam('email');
  let ref = doc(db, "MedicalInfo", email);
  const data = await getDoc(ref);
  if (data.exists()) {
    // Print the checked value or use it as needed
    document.getElementById("first-name").value = data.data().firstName || "";
    document.getElementById("last-name").value = data.data().lastName || "";
    document.getElementById("phone-number").value = data.data().phone || "";
    document.getElementById("date-of-birth").value =
      data.data().dateOfBirth || "";
    document.getElementById("id-number").value = data.data().idNumber || "";
    // document.getElementById(data.gender).checked = true; // Assuming gender is stored as either "male" or "female"
    document.getElementById("blood-type").value = data.data().bloodType || "";
    document.getElementById("height").value = data.data().height || "";
    document.getElementById("height-unit").value = data.data().heightUnit || "";
    document.getElementById("weight").value = data.data().weight || "";
    document.getElementById("weight-unit").value = data.data().weightUnit || "";
    document.getElementById("country").value = data.data().country || "";
    document.getElementById("province").value = data.data().province || "";
    console.log(data.data().province,data.data().city)
    document.getElementById("city").value = data.data().city || "";
    document.getElementById("medical-condition-note").value = data.data().medicalConditionNotes
    || "";
    let gender = data.data().gender;
    if (gender == "male") {
      document.getElementById("male").checked = true;
    } else {
      document.getElementById("female").checked = true;
    }
    let tattogetvalue = data.data().tattoo;
    if (tattogetvalue == "yes") {
      tattooYes.checked = true;
    } else {
      tattooNo.checked = true;
    }
    let medicalCond = data.data().medicalCondition;
    if (medicalCond == "yes") {
      medicalYes.checked = true;
    } else {
      medicalNo.checked = true;
    }
    const inputs = document.querySelectorAll("input, select, textarea");
    inputs.forEach((input) => {
      input.disabled = true;
    });
  } else {
    console.log("no data");
  }
}
