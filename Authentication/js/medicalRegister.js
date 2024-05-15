import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-analytics.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
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
// -------------------------------------------------------------------------------
 document.getElementById("province").addEventListener("change",()=>{
  updateCities()
 });
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
const medicalRegisterBtn = document.getElementById("medical-reg-btn");
if (medicalRegisterBtn) {
  medicalRegisterBtn.addEventListener("click", () => {
    console.log("clicked");
    const medicalNameMedicalCenter = document.getElementById(
      "name_medical_center"
    ).value;
    const medicalPhoneNumber = document.getElementById("phone_number").value;
    const medicalCountry = document.getElementById("country").value;
    // const medicalProvince = document.getElementById("province").value;
    const city = document.getElementById("city").value;
    const province=document.getElementById("province").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const mondayOpen = document.getElementById("monday-open").value;
    const mondayClose = document.getElementById("monday-close").value;
    const tuesdayOpen = document.getElementById("tuesday-open").value;
    const tuesdayClose = document.getElementById("tuesday-close").value;
    const wednesdayOpen = document.getElementById("wednesday-open").value;
    const wednesdayClose = document.getElementById("wednesday-close").value;
    const thursdayOpen = document.getElementById("thursday-open").value;
    const thursdayClose = document.getElementById("thursday-close").value;
    const fridayOpen = document.getElementById("friday-open").value;
    const fridayClose = document.getElementById("friday-close").value;
    const saturdayOpen = document.getElementById("saturday-open").value;
    const saturdayClose = document.getElementById("saturday-close").value;
    const sundayOpen = document.getElementById("sunday-open").value;
    const sundayClose = document.getElementById("sunday-close").value;
    console.log("clicked medical");
    createNewUser(
      email,
      password,
      medicalNameMedicalCenter,
      medicalCountry,
      medicalPhoneNumber,
      mondayOpen,
      mondayClose,
      tuesdayOpen,
      tuesdayClose,
      wednesdayOpen,
      wednesdayClose,
      thursdayOpen,
      thursdayClose,
      fridayOpen,
      fridayClose,
      saturdayOpen,
      saturdayClose,
      sundayOpen,
      sundayClose,
      city,
      province
    );
  });
}
function createNewUser(
  email,
  password,
  medicalNameMedicalCenter,
  medicalCountry,
  medicalPhoneNumber,
  mondayOpen,
  mondayClose,
  tuesdayOpen,
  tuesdayClose,
  wednesdayOpen,
  wednesdayClose,
  thursdayOpen,
  thursdayClose,
  fridayOpen,
  fridayClose,
  saturdayOpen,
  saturdayClose,
  sundayOpen,
  sundayClose,
  city,
  province
) {
  createUserWithEmailAndPassword(auth, email, password).then((credenitails) => {
    console.log("user added Auth ");
    addUserInfo(email,medicalNameMedicalCenter);
    addMedicalCenterInfo(
      email,
      medicalNameMedicalCenter,
      medicalPhoneNumber,
      medicalCountry,      
      mondayOpen,
      mondayClose,
      tuesdayOpen,
      tuesdayClose,
      wednesdayOpen,
      wednesdayClose,
      thursdayOpen,
      thursdayClose,
      fridayOpen,
      fridayClose,
      saturdayOpen,
      saturdayClose,
      sundayOpen,
      sundayClose,
      city,
      province
    ).catch((err) => {
      console.log(err);
    });
  });
  async function addUserInfo(email,name) {
    let ref = doc(db, "users", email);
    await setDoc(ref, {
      userType: "medical",
      centerName: name,
    })
      .then(() => {
        console.log("added done to database");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function addMedicalCenterInfo(
    email,
    medicalNameMedicalCenter,
    medicalPhoneNumber,
    medicalCountry,  
    mondayOpen,
    mondayClose,
    tuesdayOpen,
    tuesdayClose,
    wednesdayOpen,
    wednesdayClose,
    thursdayOpen,
    thursdayClose,
    fridayOpen,
    fridayClose,
    saturdayOpen,
    saturdayClose,
    sundayOpen,
    sundayClose,
    city,
    province
  ) {
    let ref = doc(db, "MedicalCenters", email);

    await setDoc(ref, {
      medicalNameMedicalCenter: medicalNameMedicalCenter || "",
      medicalCountry: medicalCountry || "",
      medicalPhoneNumber: medicalPhoneNumber || "",
      mondayOpen: mondayOpen || "",
      mondayClose: mondayClose || "",
      tuesdayOpen: tuesdayOpen || "",
      tuesdayClose: tuesdayClose || "",
      wednesdayOpen: wednesdayOpen || "",
      wednesdayClose: wednesdayClose || "",
      thursdayOpen: thursdayOpen || "",
      thursdayClose: thursdayClose || "",
      fridayOpen: fridayOpen || "",
      fridayClose: fridayClose || "",
      saturdayOpen: saturdayOpen || "",
      saturdayClose: saturdayClose || "",
      sundayOpen: sundayOpen || "",
      sundayClose: sundayClose || "",
      city: city || "",
      province: province || "",
    })
      .then(() => {
        bloodBankInit(email, city,province);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  async function bloodBankInit(email, city,province) {
    let ref = doc(db, "BloodBanks", email);

    await setDoc(ref, {
      "A+": 0,
      "A-": 0,
      "B+": 0,
      "B-": 0,
      "AB+": 0,
      "AB-": 0,
      "O+": 0,
      "O-": 0,
      city: city,
      province:province
    }).then(() => {
      localStorage.setItem("centerName", medicalNameMedicalCenter);
      localStorage.setItem("email", email);
      window.location.href = "../Medical/index.html";

      console.log("blood bank init");
    });
  }
}
