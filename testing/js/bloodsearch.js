
      let navigation = document.querySelector(".navigation"),
        toggle = document.querySelector(".toggle"),
        main = document.querySelector(".main");

      toggle.onclick = function () {
        navigation.classList.toggle("active");
        main.classList.toggle("active");
      };
    
      
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
// -----------------------------------------------------------------------------------
document.getElementById("searchButton").addEventListener("click", function() {
    // Get the selected city
    const selectedCity = document.getElementById("city").value;
    
    // Get the selected blood type
    const selectedBloodType = document.querySelector('input[name="blood-type"]:checked').value;
    console.log("clicked")
    getDocuments(selectedCity,selectedBloodType)

   
});
function getDocuments(city,bloodType) {
    document.getElementById("table").innerHTML=""

    console.log(city,bloodType)

    const q = query(collection(db, "BloodBanks"), 
                    where("city", "==", city,"&&","bloodType", "==", bloodType)
                    // where("bloodType", "==", `O+`)
                );

    getDocs(q)
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                const bloodValue = doc.data()[bloodType];
                fillTable(doc.id,bloodValue,bloodType)
              
                // Use the data as needed
            });
        })
        .catch((error) => {
          alert("error getting documents")
        });
}
function fillTable(email,bloodValue,bloodType){
    console.log(email,bloodValue,bloodType)
    let content=`
    <tr>
    <td>${bloodType}</td>
    <td>${bloodValue}</td>
    <td>${email}</td>
    <!-- <td><span class="status return">Return</span></td> -->
  </tr>`
  document.getElementById("table").innerHTML+=content
}