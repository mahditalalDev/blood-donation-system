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
// ------------------------------------------------------------------------

const countryInput = document.getElementById("country");
const provinceInput = document.getElementById("province");
const cityInput = document.getElementById("city");
const registerButton = document.getElementById("registerBtn");
const medicalCenterData = [];
getMedicalCentersName();
async function getMedicalCentersName() {
  const q = query(
    collection(db, "users"),
    where("userType", "==", "medical",)
    // where("bloodType", "==", `O+`)
  );

  getDocs(q)
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        medicalCenterData.push({email:doc.id,centerName:doc.data().centerName})
        // const bloodValue = doc.data()[bloodType];
        // fillTable(doc.id, bloodValue, bloodType);

        // Use the data as needed
      });
     fillSpinnerCentersName(medicalCenterData) 
    })
    .catch((error) => {
      console.error("Error getting documents:", error);
    });
}

 function fillSpinnerCentersName(data){
    let centerName= document.getElementById("medical-centers")
    for(let center of data){
        // console.log(center.email)
        let content=`<option value="${center.email}">${center.centerName}</option>
        `
        centerName.innerHTML+=content
    }
    } 
// Add event listener to the submit button
registerButton.addEventListener("click", function (event) {
  // Prevent the default form submission behavior
  event.preventDefault();
  let centerName= document.getElementById("medical-centers")
let centerEmail=centerName.value;
// console.log(center)

  // Retrieve the values from the input fields
  const country = countryInput.value;
  const province = provinceInput.value;
  const city = cityInput.value;

  // Get the value of the checked radio button
  let bloodQuantity;
  const radioButtons = document.querySelectorAll('input[name="bloodQuantity"]');
  radioButtons.forEach((radioButton) => {
    if (radioButton.checked) {
      bloodQuantity = radioButton.value;
    }
  });

  // Log the values to the console
  console.log("Country:", country);
  console.log("Province:", province);
  console.log("City:", city);
  console.log("Blood Quantity:", bloodQuantity);
  addDocWithSpecificId(
    localStorage.getItem("email"),
    country,
    province,
    city,
    bloodQuantity,
    centerEmail
  );
});

async function addDocWithSpecificId(
  email,
  country,
  province,
  city,
  bloodQuantity,
  centerEmaill
) {
  let ref = doc(db, "DonationRequests", email);

  const docref = await setDoc(ref, {
    email: email,
    country: country,
    province: province,
    city: city,
    bloodQuantity: bloodQuantity,
    status: "pending",
    deleted: "false",
    centerEmail:centerEmaill
  })
    .then(() => {
      console.log("added done");
    })
    .catch((err) => {
      console.log(err);
    });
}
//-------------
