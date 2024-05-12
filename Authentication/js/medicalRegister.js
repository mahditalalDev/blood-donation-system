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
    const city = document.getElementById("cities").value;
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
