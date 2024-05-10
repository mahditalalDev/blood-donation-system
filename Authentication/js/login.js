import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-analytics.js";
import {
  getAuth,
  
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
// ---------------------------------------------------------------------------------------
// Check if the element exists before adding the event listener

const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent form submission

    const email = document.getElementById("email-login").value;
    const password = document.getElementById("password-login").value;

    // Call loginUser function with email and password
    loginUser(email, password);
  });
}
function loginUser(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Login successful, user information is available in userCredential.user
      const user = userCredential.user;
      console.log("Login successful:", user);
      loginWindow(email);
      // Redirect or perform further actions here
    })
    .catch((error) => {
      alert(error)
      // Login failed, handle error
      console.error("Login failed:", error);
    });
}

async function loginWindow(email) {
  let ref = doc(db, "users", email);
  const docSnap = await getDoc(ref);
  if (docSnap.exists()) {
    const userType = docSnap.data().userType;
    const centerName = docSnap.data().centerName;
    if (userType == "medical") {
        localStorage.clear()
      localStorage.setItem("email", email);
      localStorage.setItem("centerName", centerName);
      localStorage.setItem("userType", "medical");
      window.location.href = "../Medical/index.html";
    } else if (userType == "donor") {
        localStorage.clear()
      localStorage.setItem("email", email);
      localStorage.setItem("userType", "donor");
      window.location.href = "../Donor/donorhomepage.html";
    }

    console.log(userType);
  } else {
    console.log("no data");
  }
}

// saad-branch - we should improve this. Now I think it is loading on every page in Authentication directory

var phoneNumberInput = document.getElementById("phone_number");
if (phoneNumberInput) {
  phoneNumberInput.addEventListener("input", function () {
    var pattern = new RegExp(phoneNumberInput.pattern);
    if (pattern.test(phoneNumberInput.value)) {
      // If the value matches the pattern, change the outline to green
      phoneNumberInput.style.outline = "2px solid green";
    } else {
      // If the value doesn't match the pattern, change the outline back to the default
      phoneNumberInput.style.outline = "";
    }
  });
}
