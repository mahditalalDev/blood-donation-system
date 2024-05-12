let info = [];
let index = 0;
let buttons = [];

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
  increment,
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

const donationRequestCollectionRef = collection(db, "DonationRequests");
let datareguest = [];
document.getElementById("tablebody").innerHTML = "";

getRequests(); // Call getRequests function to populate the table initially
document.getElementById("sign-out-btn").addEventListener("click", () => {
  
  
  const confirmation = confirm("Are you sure you want to logout?");

  // If user clicks "OK", redirect to index.html
  if (confirmation) {
    localStorage.clear();
    window.location.href = "../index.html";
    
  }

});
async function getRequests() {
  let test = [];
  let center=localStorage.getItem("centerName")
  const q = query(
    donationRequestCollectionRef,
    where("centerEmail", "==", localStorage.getItem("email"))
  );

  try {
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      test.push({ donorEmail: doc.id, data: doc.data() });
    });
    console.log("the test is", test);
    await getDonorInfo(test);
  } catch (error) {
    console.error("Error getting documents: ", error);
  }
}

async function getDonorInfo(test) {
  let help = [];
  for (let info of test) {
    await getSpecificDocument(info);
  }
  filltable(help);

  async function getSpecificDocument(info) {
    let ref = doc(db, "MedicalInfo", info.donorEmail);
    const docSnap = await getDoc(ref);
    if (docSnap.exists()) {
      help.push({ donorInfo: docSnap.data(), reguestInfo: info });
    } else {
      console.log("no data");
    }
  }
}

function filltable(array) {
  let content = "";
  array.forEach((item) => {
    const { donorInfo, reguestInfo } = item;
    const status = reguestInfo.data.status;
    let statusBackground = "";

    // Set background color based on status
    switch (status) {
      case "pending":
        statusBackground = "background-color: blue;";
        break;
      case "rejected":
        statusBackground = "background-color: red;";
        break;
      case "accepted":
        statusBackground = "background-color: green;";
        break;
      default:
        statusBackground = ""; // Default background color
        break;
    }

    content += `
      <tr>
        <td>${donorInfo.firstName} ${donorInfo.lastName}</td>
        <td>${reguestInfo.data.bloodQuantity}</td>
        <td>${donorInfo.bloodType}</td>
        <td>${reguestInfo.data.city}</td>
        <td><span style="${statusBackground}">${status}</span></td>
        <td>${donorInfo.phoneNumber}</td>
        <td>
          <button class="more-btn" data-donor-email="${
            reguestInfo.donorEmail
          }" data-medical-email="${
      donorInfo.email
    }" style="background-color:blue;padding:10px;border-radius:5px">more</button>
        </td>
        <td>
          <div id="done-btn" style="display:flex;justify-content:center;gap:5px">
            ${
              status === "pending"
                ? `
              <button class="accept-btn" data-donor-bloodType="${donorInfo.bloodType}" data-donor-bloodQuantity="${reguestInfo.data.bloodQuantity}" data-donor-email="${reguestInfo.donorEmail}" data-medical-email="${donorInfo.email}" style="background-color:green;padding:10px;border-radius:5px">accept</button>
              <button class="reject-btn" data-donor-email="${reguestInfo.donorEmail}" data-medical-email="${donorInfo.email}" style="background-color:red;padding:10px;border-radius:5px">reject</button>
            `
                : ""
            }
            ${
              status === "accepted"
                ? `
              <span style="background-color: green; padding: 5px; border-radius: 5px;">Accepted</span>
            `
                : ""
            }
          </div>
          <div id="return-btn"></div>
        </td>
      </tr>`;
  });

  document.getElementById("tablebody").innerHTML = content;

  // Add click event listeners to buttons
  document.querySelectorAll(".more-btn").forEach((button) => {
    button.addEventListener("click", function () {
      const donorEmail = this.getAttribute("data-donor-email");
      // const medicalEmail = this.getAttribute("data-medical-email");
      console.log("Donor Email:", donorEmail);
      // console.log("Medical Email:", medicalEmail);
      window. open(`../qrreader.html?email=${donorEmail}`, '_blank');
    });
  });

  document.querySelectorAll(".accept-btn").forEach((button) => {
    button.addEventListener("click", function () {
      const donorEmail = this.getAttribute("data-donor-email");
      const donorbloodType = this.getAttribute("data-donor-bloodType");
      const donorbloodQuantity = this.getAttribute("data-donor-bloodQuantity");
      console.log(donorbloodType, donorbloodQuantity);
      updateSpecificDocument(donorEmail, "accepted");
      updateBloodBank("email", donorbloodType, donorbloodQuantity);
    });
  });

  document.querySelectorAll(".reject-btn").forEach((button) => {
    button.addEventListener("click", function () {
      const donorEmail = this.getAttribute("data-donor-email");
      updateSpecificDocument(donorEmail, "rejected");
    });
  });
}

async function updateBloodBank(email, bloodType, bloodQuantity) {
  const docRef = doc(db, "BloodBanks", localStorage.getItem("email"));

  // Update the blood type field by the specified amount
  await updateDoc(docRef, { [bloodType]: increment(bloodQuantity) });

  // Log a message to indicate that the update was successful
  console.log(`Updated ${bloodType} by ${bloodQuantity}`);
}

async function updateSpecificDocument(donorEmail, action) {
  let ref = doc(db, "DonationRequests", donorEmail);
  await updateDoc(ref, {
    status: action,
  })
    .then(() => {
      console.log(`${action} request`);
      const spinner = document.getElementById("spinner");
      const selectedOption = spinner.options[spinner.selectedIndex].value;

      // Only refresh the table if the selected option is "pending"
      if (selectedOption === "pending") {
        getRequestsByStatus("pending");
      }
      if (selectedOption === "all") {
        getRequestsByStatus("all");
      }
      if (selectedOption === "accepted") {
        getRequestsByStatus("accepted");
      }
      if (selectedOption === "rejected") {
        getRequestsByStatus("rejected");
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

let navigation = document.querySelector(".navigation"),
  toggle = document.querySelector(".toggle"),
  main = document.querySelector(".main");

toggle.onclick = function () {
  navigation.classList.toggle("active");
  main.classList.toggle("active");
};
document.getElementById("spinner").addEventListener("change", () => {
  const spinner = document.getElementById("spinner");
  const selectedOption = spinner.options[spinner.selectedIndex].value;

  switch (selectedOption) {
    case "pending":
      getRequestsByStatus("pending");
      break;
    case "accepted":
      getRequestsByStatus("accepted");
      break;
    case "rejected":
      getRequestsByStatus("rejected");
      break;
    case "all":
      getRequests();
      break;
    default:
      break;
  }
});
async function getRequestsByStatus(status) {
  let test = [];
  const q = query(
    donationRequestCollectionRef,
    where("centerEmail", "==", localStorage.getItem("email")),
    where("status", "==", status)
  );

  try {
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      test.push({ donorEmail: doc.id, data: doc.data() });
    });
    console.log("the test is", test);
    await getDonorInfo(test);
  } catch (error) {
    console.error("Error getting documents: ", error);
  }
}
