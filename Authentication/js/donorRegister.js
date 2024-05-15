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

const donorRegisterBtn = document.getElementById("donor-register-Btn");
if (donorRegisterBtn) {
  donorRegisterBtn.addEventListener("click", () => {
    const firstName = document.getElementById("first-name").value;
    const lastName = document.getElementById("last-name").value;
    const phoneNumber = document.getElementById("phone-number").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    createNewUser(email, password, firstName, lastName, phoneNumber, "donor");
  });
}
function createNewUser(
  email,
  password,
  firstName,
  lastName,
  phoneNumber,
  userType
) {
  createUserWithEmailAndPassword(auth, email, password).then((credenitails) => {
    addUserInfo(userType, email, phoneNumber, firstName, lastName);
  });
}
async function addUserInfo(userType, email, phone, fname, lname) {
  let ref = doc(db, "users", email);
  await setDoc(ref, {
    userType: userType,
  })
    .then(() => {
      console.log("added new user");
      addMedicalInfo(email, fname, lname, phone);
    })
    .catch((err) => {
      console.log(err);
      alert(err);
    });
}
async function addMedicalInfo(email, firstName, lastName, phoneNumber) {
  let ref = doc(db, "MedicalInfo", email);

  await setDoc(ref, {
    firstName: firstName || "",
    lastName: lastName || "",
    phone: phoneNumber || "",
  })
    .then(() => {
      console.log("data added  to database");
      localStorage.setItem("email", email);
      localStorage.setItem("userType", "donor");
      window.location.href = "../Donor/donorhomepage.html";
    })
    .catch((err) => {
      console.log(err);
    });
}
