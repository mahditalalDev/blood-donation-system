
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
  increment,
  addDoc,
  updateDoc,
  deleteDoc,
  deleteField,
  query,
  where,
  limit,
  orderBy,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
const db = getFirestore();
const auth = getAuth();
getRequestAccepted()

async function getRequestAccepted() {
    // let test = [];
    const q = query(
        collection(db, "DonationRequests"),
      where("status", "==", "accepted"),
      limit(5)
    );
  
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // console.log(doc.data())
        let bloodQuantity=doc.data().bloodQuantity;
        let donorEmail=doc.data().email;
        filltable(donorEmail,bloodQuantity)
        // test.push({ donorEmail: doc.id, data: doc.data() });
      });
    //   console.log("the test is", test);
    //   await getDonorInfo(test);
    } catch (error) {
      console.error("Error getting documents: ", error);
    }
  }
 async function  filltable(email,blood){
    let ref = doc(db, "MedicalInfo", email);
    const docSnap = await getDoc(ref);
    if (docSnap.exists()) {
      let data=docSnap.data()
      let firstName=data.firstName
      let lastName=data.lastName
      let bloodType=data.bloodType 
      let content=`
      <tr>
                    <td scope="col">#</td>
                    <td scope="col">${firstName+""+lastName}</td>
                    <td scope="col">${bloodType}</td>
                    <td scope="col">${blood}</td>
                  </tr>
      `
      document.getElementById("table-body-heros").innerHTML+=content
    } else {
      console.log("no data");
    }


 }