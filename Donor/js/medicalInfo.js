import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-analytics.js";

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
provinceInput.addEventListener("change",()=>{
  updateCities()
})
function updateCities() {
  var provinceSelect = document.getElementById("province");
  var citySelect = document.getElementById("city");
  var province = provinceSelect.value;
  citySelect.innerHTML = ""; // Clear existing options
  
  // Define cities based on selected province
  var cities = [];
  switch (province) {
    case "Beirut":
      cities = ["Beirut City", "Achrafieh", "Hamra"];
      break;
    case "South Lebanon":
      cities = ["Tyre", "Sidon", "Jezzine"];
      break;
    case "North Lebanon":
      cities = ["Tripoli", "Bsharri", "Batroun"];
      break;
    case "Mount Lebanon":
      cities = ["Jounieh", "Zahle", "Byblos"];
      break;
    case "Bekaa":
      cities = ["Zahle", "Baalbek", "Rashaya"];
      break;
    case "Nabatieh":
      cities = ["Nabatieh", "Hasbaya", "Bint Jbeil"];
      break;
    case "Akkar":
      cities = ["Halba", "Akkar el Atika", "Kobayat"];
      break;
    case "Baabda":
      cities = ["Baabda", "Aley", "Chouf"];
      break;
    case "Baalbek-Hermel":
      cities = ["Baalbek", "Hermel", "Qaa"];
      break;
  }
  
  // Populate city select with options
  cities.forEach(function(city) {
    var option = document.createElement("option");
    option.text = city;
    option.value = city;
    citySelect.add(option);
  });
}
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
    let citySelect=document.getElementById("city")
    var option = document.createElement("option");
    option.text = data.data().city;
    option.value = city;
    option.selected=true
    citySelect.add(option);
    
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
