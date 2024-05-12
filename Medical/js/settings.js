import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-analytics.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
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
const googleProvider = new GoogleAuthProvider();
import {
  getFirestore,
  doc,
  getDoc,
  getDocs, //get all documents inside one collection
  setDoc,
  collection,
  FieldValue,
  addDoc,
  updateDoc,
  increment,
  deleteDoc,
  deleteField,
  query,
  where,
  orderBy,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
const db = getFirestore();
const auth = getAuth();

const centerNameInput = document.getElementById("name_medical_center");
const phoneNumberInput = document.getElementById("phone_number");
const countryInput = document.getElementById("country");
const provinceInput = document.getElementById("province-group");
getSpecificDocument();
let dataHours = {};

async function getSpecificDocument() {
  let ref = doc(db, "MedicalCenters", localStorage.getItem("email"));
  const docSnap = await getDoc(ref);
  if (docSnap.exists()) {
    let data = docSnap.data();
    let centerName = data.medicalNameMedicalCenter;
    centerNameInput.value = centerName;
    let phoneNumber = data.medicalPhoneNumber;
    phoneNumberInput.value = phoneNumber;
    let province=data.province
    let mondayOpen = data.mondayOpen;
    let mondayClose = data.mondayClose;
    let tuesdayOpen = data.tuesdayOpen;
    let tuesdayClose = data.tuesdayClose;
    let wednesdayOpen = data.wednesdayOpen;
    let wednesdayClose = data.wednesdayClose;
    let thursdayOpen = data.thursdayOpen;
    let thursdayClose = data.thursdayClose;
    let fridayOpen = data.fridayOpen;
    let fridayClose = data.fridayClose;
    let saturdayOpen = data.saturdayOpen;
    let saturdayClose = data.saturdayClose;
    let sundayOpen = data.sundayOpen;
    let sundayClose = data.sundayClose;
    document.getElementById("monday-open").value = mondayOpen;
    document.getElementById("monday-close").value = mondayClose;
    document.getElementById("tuesday-open").value = tuesdayOpen;
    document.getElementById("tuesday-close").value = tuesdayClose;
    document.getElementById("wednesday-open").value = wednesdayOpen;
    document.getElementById("wednesday-close").value = wednesdayClose;
    document.getElementById("thursday-open").value = thursdayOpen;
    document.getElementById("thursday-close").value = thursdayClose;
    document.getElementById("friday-open").value = fridayOpen;
    document.getElementById("friday-close").value = fridayClose;
    document.getElementById("saturday-open").value = saturdayOpen;
    document.getElementById("saturday-close").value = saturdayClose;
    document.getElementById("sunday-open").value = sundayOpen;
    document.getElementById("sunday-close").value = sundayClose;
    document.getElementById("selected-province").value=province;
    document.getElementById("country").value="LB";
    // document.getElementById("country").style.color="black";
    console.log(docSnap.data());
  } else {
    console.log("no data");
  }
}
// Function to enable/disable opening hours based on checkbox state
function toggleOpeningHours(day) {
  const openInput = document.getElementById(`${day}-open`);
  const closeInput = document.getElementById(`${day}-close`);
  const switchInput = document.getElementById(`${day}-switch`);

  if (switchInput.checked) {
    openInput.removeAttribute("disabled");
    closeInput.removeAttribute("disabled");
  } else {
    openInput.setAttribute("disabled", "disabled");
    closeInput.setAttribute("disabled", "disabled");
  }
  return;
}
document.getElementById("sign-out-btn").addEventListener("click", () => {
        
        
  const confirmation = confirm("Are you sure you want to logout?");

  // If user clicks "OK", redirect to index.html
  if (confirmation) {
    localStorage.clear();
    window.location.href = "../index.html";
    
  }

});
// Function to log the opening hours data

async function updateValues() {
  let ref = doc(db, "MedicalCenters", localStorage.getItem("email"));
  await updateDoc(ref, {
    mondayOpen: document.getElementById("monday-open").value,
    mondayClose: document.getElementById("monday-close").value,
    tuesdayOpen: document.getElementById("tuesday-open").value,
    tuesdayClose: document.getElementById("tuesday-close").value,
    wednesdayOpen: document.getElementById("wednesday-open").value,
    wednesdayClose: document.getElementById("wednesday-close").value,
    thursdayOpen: document.getElementById("thursday-open").value,
    thursdayClose: document.getElementById("thursday-close").value,
    fridayOpen: document.getElementById("friday-open").value,
    fridayClose: document.getElementById("friday-close").value,
    saturdayOpen: document.getElementById("saturday-open").value,
    saturdayClose: document.getElementById("saturday-close").value,
    sundayOpen: document.getElementById("sunday-open").value,
    sundayClose: document.getElementById("sunday-close").value,
    province:document.getElementById("selected-province").value,
    country:document.getElementById("country").value
  })
    .then(() => {
      console.log("added done");
      getSpecificDocument();
    })
    .catch((err) => {
      console.log(err);
    });
}

// Add event listeners to each checkbox to toggle opening hours
const days = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];
days.forEach((day) => {
  const switchInput = document.getElementById(`${day}-switch`);
  switchInput.addEventListener("change", () => {
    toggleOpeningHours(day);
  });
});

// Add event listener to the button to log opening hours data
const submitButton = document.getElementById("medical_update");
submitButton.addEventListener("click", (event) => {
  event.preventDefault();
  updateValues()
    .then(() => {
      console.log("updated");
    }
    ).catch((err) => {
      console.log(err);
        
});
});

// Add event listener to the button to log opening hours data