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
const firstNameInput = document.getElementById("first-name");
const email = localStorage.getItem("email");
const lastNameInput = document.getElementById("last-name");
const phoneNumberInput = document.getElementById("phone-number");
const dateOfBirthInput = document.getElementById("date-of-birth");
const idNumberInput = document.getElementById("id-number");
const genderInput = document.querySelector('input[name="gender"]:checked');
const bloodTypeInput = document.getElementById("blood-type");
const heightInput = document.getElementById("height");
const heightUnitInput = document.getElementById("height-unit");
const weightInput = document.getElementById("weight");
const weightUnitInput = document.getElementById("weight-unit");
const countryInput = document.getElementById("country");
const provinceInput = document.getElementById("province");
// Get the radio buttons
const tattooYes = document.getElementById("tattoo-yes");
const medicalYes = document.getElementById("medical_condition-yes");
const medicalNo = document.getElementById("medical_condition-no");
const tattooNo = document.getElementById("tattoo-no");


// Function to handle radio button change
function handleTattooChange() {
let  tattooValue = tattooYes.checked ? "yes" : tattooNo.checked ? "no" : "";
  return tattooValue;
}
function showInfoBox() {
  var infoBox = document.getElementById("info-box");
  infoBox.style.display = "block";
}

function hideInfoBox() {
  var infoBox = document.getElementById("info-box");
  infoBox.style.display = "none";
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

const cityInput = document.getElementById("city");
const medicalConditionInput = document.querySelector(
  'input[name="medical_condition"]:checked'
);

// const tattooInput = document.querySelector('input[name="tattoo"]:checked');
const medicalConditionNotesInput = document.getElementById("medical-condition-notes");
document.getElementById("submit-btn").addEventListener("click", () => {
 


  updateSpecificDocument();
});
async function updateSpecificDocument() {
  const email = localStorage.getItem("email");
  console.log(email);
  const db = getFirestore();
  let ref = doc(db, "MedicalInfo", email);

  await updateDoc(ref, {
    firstName: firstNameInput.value,
    lastName: lastNameInput.value,
    phoneNumber: phoneNumberInput.value,
    dateOfBirth: dateOfBirthInput.value,
    idNumber: idNumberInput.value,
    gender: genderInput ? genderInput.value : "",
    bloodType: bloodTypeInput.value,
    height: heightInput.value,
    heightUnit: heightUnitInput.value,
    weight: weightInput.value,
    weightUnit: weightUnitInput.value,
    country: countryInput.value,
    province: provinceInput.value,
    city: cityInput.value,
    medicalCondition: handleMedicalChange(),
    tattoo : handleTattooChange(),
    medicalConditionNotes: medicalConditionNotesInput.value,
  })
    .then(() => {
      alert("your Medical Information is updated")
      console.log("added done");
    })
    .catch((err) => {
      console.log(err);
      alert(err)
    });
}
//data.firstName;
getSpecificDocument();
async function getSpecificDocument() {
  let ref = doc(db, "MedicalInfo",localStorage.getItem("email"));
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
    document.getElementById("city").value = data.data().city || "";
    document.getElementById("medical-condition-notes").value = data.data().medicalConditionNotes || "";
    let gender=data.data().gender
    if(gender=="male"){
      document.getElementById("male").checked=true
    }
    else{
      document.getElementById("female").checked=true

    }
    let tattogetvalue=data.data().tattoo;
    if (tattogetvalue=="yes"){
      tattooYes.checked=true
    }else{
      tattooNo.checked=true
    }
    let medicalCond=data.data().medicalCondition;
    if(medicalCond=="yes"){
      medicalYes.checked=true
    }else{
      medicalNo.checked=true
    }
    
  
      
  } else {
    console.log("no data");
  }
}
