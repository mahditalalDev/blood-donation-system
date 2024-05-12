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
// ----------------------------------------------------------------------------------
// Reference to your document

function getEmailFromURL() {
    // Get the current URL
    var url = window.location.href;

    // Get the query string part of the URL
    var queryString = url.split('?')[1];

    // If there's no query string or it doesn't contain an '=' character, return null
    if (!queryString || queryString.indexOf('=') === -1) {
        return null;
    }

    // Split the query string into key-value pair
    var param = queryString.split('=');

    // If the key is 'email', return the decoded value
    if (param[0] === 'email') {
        return decodeURIComponent(param[1]);
    }

    // If the key is not 'email', return null
    return null;
}

// Usage
var email = getEmailFromURL();
getSpecificDocument(email);
async function getSpecificDocument(email) {
  let ref = doc(db, "MedicalCenters", email);
  const docSnap = await getDoc(ref);
  if (docSnap.exists()) {
    let data = docSnap.data();

    document.getElementById("center-name").value = data.medicalNameMedicalCenter
    ;
    document.getElementById("phone-number").value = data.medicalPhoneNumber;
    document.getElementById("country").value = "Lebanon";
    document.getElementById("province").value = data.province
    ;
    document.getElementById("city").value = data.city;

    // Disable editing for input fields
    document.getElementById("center-name").readOnly = true;
    document.getElementById("phone-number").readOnly = true;
    document.getElementById("country").readOnly = true;
    document.getElementById("province").readOnly = true;
    document.getElementById("city").readOnly = true;

    // Populate table with opening hours data
    document.getElementById("monday-open").value = data.mondayOpen;
    document.getElementById("monday-close").value = data.mondayClose;
    document.getElementById("tuesday-open").value = data.tuesdayOpen;
    document.getElementById("tuesday-close").value = data.tuesdayClose;
    document.getElementById("wednesday-open").value = data.wednesdayOpen;
    document.getElementById("wednesday-close").value = data.wednesdayClose;
    document.getElementById("thursday-open").value = data.thursdayOpen;
    document.getElementById("thursday-close").value = data.thursdayClose;
    document.getElementById("friday-open").value = data.fridayOpen;
    document.getElementById("friday-close").value = data.fridayClose;
    document.getElementById("saturday-open").value = data.saturdayOpen;
    document.getElementById("saturday-close").value = data.saturdayClose;
    document.getElementById("sunday-open").value = data.sundayOpen;
    document.getElementById("sunday-close").value = data.sundayClose;

    // Repeat the process for other days...

    // Disable editing for opening hours
    // Days of the week
    var daysOfWeek = [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday",
    ];

    // Loop through each day of the week
    daysOfWeek.forEach((day) => {
      // Set opening and closing time inputs to readOnly
      document.getElementById(day + "-open").readOnly = true;
      document.getElementById(day + "-close").readOnly = true;
    });

    //   let data = docSnap.data();
    //   let centerName = data.medicalNameMedicalCenter;
    //   centerNameInput.value = centerName;
    //   let phoneNumber = data.medicalPhoneNumber;
    //   phoneNumberInput.value = phoneNumber;
    //   let province=data.province
    //   let mondayOpen = data.mondayOpen;
    //   let mondayClose = data.mondayClose;
    //   let tuesdayOpen = data.tuesdayOpen;
    //   let tuesdayClose = data.tuesdayClose;
    //   let wednesdayOpen = data.wednesdayOpen;
    //   let wednesdayClose = data.wednesdayClose;
    //   let thursdayOpen = data.thursdayOpen;
    //   let thursdayClose = data.thursdayClose;
    //   let fridayOpen = data.fridayOpen;
    //   let fridayClose = data.fridayClose;
    //   let saturdayOpen = data.saturdayOpen;
    //   let saturdayClose = data.saturdayClose;
    //   let sundayOpen = data.sundayOpen;
    //   let sundayClose = data.sundayClose;
    //   document.getElementById("monday-open").value = mondayOpen;
    //   document.getElementById("monday-close").value = mondayClose;
    //   document.getElementById("tuesday-open").value = tuesdayOpen;
    //   document.getElementById("tuesday-close").value = tuesdayClose;
    //   document.getElementById("wednesday-open").value = wednesdayOpen;
    //   document.getElementById("wednesday-close").value = wednesdayClose;
    //   document.getElementById("thursday-open").value = thursdayOpen;
    //   document.getElementById("thursday-close").value = thursdayClose;
    //   document.getElementById("friday-open").value = fridayOpen;
    //   document.getElementById("friday-close").value = fridayClose;
    //   document.getElementById("saturday-open").value = saturdayOpen;
    //   document.getElementById("saturday-close").value = saturdayClose;
    //   document.getElementById("sunday-open").value = sundayOpen;
    //   document.getElementById("sunday-close").value = sundayClose;
    //   document.getElementById("selected-province").value=province;
    //   document.getElementById("country").value="LB";
    // document.getElementById("country").style.color="black";
    console.log(docSnap.data());
  } else {
    console.log("no data");
  }
}
