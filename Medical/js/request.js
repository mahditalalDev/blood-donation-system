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
  let center = localStorage.getItem("centerName");
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
        statusBackground = "color: black;";
        break;
      case "rejected":
        statusBackground = "color: black;";
        break;
      case "accepted":
        statusBackground = "color: black;";
        break;
      default:
        statusBackground = "white"; // Default background color
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
    }" style="padding:10px;border-radius:5px">more</button>
        </td>
        <td>
          <div id="done-btn" style="display:flex;justify-content:center;gap:5px">
            ${
              status === "pending"
                ? `
              <button class="accept-btn" data-donor-bloodType="${donorInfo.bloodType}" data-donor-bloodQuantity="${reguestInfo.data.bloodQuantity}" data-donor-email="${reguestInfo.donorEmail}" data-medical-email="${donorInfo.email}" style="color:black;padding:10px;border-radius:5px">accept</button>
              <button class="reject-btn" data-donor-email="${reguestInfo.donorEmail}" data-medical-email="${donorInfo.email}" style="color:black ;padding:10px;border-radius:5px">reject</button>
            `
                : ""
            }
            ${
              status === "accepted"
                ? `
              <span style=" padding: 5px; border-radius: 5px;">Accepted</span>
            `
                : ""
            }
            ${
              status === "rejected"
                ? `
              <span style=" padding: 5px; border-radius: 5px;">rejected</span>
            `
                : ""
            }
          </div>
          <div id="return-btn"></div>
        </td>
        <td style:"text-align:center" >
        <div  class="reminder-btn"  data-donor-email="${
          reguestInfo.donorEmail
        }" >
        <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" 
        height="1.2em" viewBox="0 0 14 14"><path fill="#4139ac" 
        fill-rule="evenodd" d="M11.821.098a1.62 1.62 0 0 1 2.077
         2.076l-3.574 10.712a1.62 1.62 0 0 1-1.168 1.069a1.599 1.599 
         0 0 1-1.52-.434l-1.918-1.909l-2.014 1.042a.5.5 0 0 1-.73-.457l.083-3.184l7.045-5.117a.625.625 0 1 
         0-.735-1.012L2.203 8.088l-1.73-1.73a1.6 1.6 0 0 1-.437-1.447a1.62 
         1.62 0 0 1 1.069-1.238h.003L11.82.097Z" clip-rule="evenodd"/></svg>
         
        </div>
       
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
      window.open(`../qrreader.html?email=${donorEmail}`, "_blank");
    });
  });

  document.querySelectorAll(".accept-btn").forEach((button) => {
    button.addEventListener("click", function () {
      const donorEmail = this.getAttribute("data-donor-email");
      const donorbloodType = this.getAttribute("data-donor-bloodType");
      const donorbloodQuantity = this.getAttribute("data-donor-bloodQuantity");
      console.log("this is", donorbloodType, donorbloodQuantity);
      updateSpecificDocument(donorEmail, "accepted");
      updateBloodBank("email", donorbloodType, donorbloodQuantity);
      // let spinnerType = document.getElementById("spinner").value;
      // switch (spinnerType) {
      //   case "All":
      //     getRequests();
      //     return;
      //   case "pending":
      //     getRequestsByStatus("pending");
      //     return;
      //   case "accepted":
      //     getRequestsByStatus("accepted");
      //     return;
      //   case "rejected":
      //     getRequestsByStatus("rejected");
      //     return;
      // }
    });
  });
  document.querySelectorAll(".reminder-btn").forEach((button) => {
    button.addEventListener("click", function () {
      const donorEmail = this.getAttribute("data-donor-email");
      composeEmail(donorEmail);
    });
  });
  function composeEmail(donorEmail) {
    const toField = encodeURIComponent(donorEmail);
    const subject = encodeURIComponent("Reminder Request for Blood Donation");
    const body = encodeURIComponent("write your body here");
    const gmailUrl = `https://mail.google.com/mail/?view=cm&to=${toField}&su=${subject}&body=${body}&fs=1&tf=1`;

    // Open Gmail compose window after filling fields
    window.open(gmailUrl, "_blank");
  }

  document.querySelectorAll(".reject-btn").forEach((button) => {
    button.addEventListener("click", function () {
      const donorEmail = this.getAttribute("data-donor-email");
      updateSpecificDocument(donorEmail, "rejected");
      // let spinnerType = document.getElementById("spinner").value;
      // switch (spinnerType) {
      //   case "All":
      //     getRequests();
      //     return;
      //   case "pending":
      //     getRequestsByStatus("pending");
      //     return;
      //   case "accepted":
      //     getRequestsByStatus("accepted");
      //     return;
      //   case "rejected":
      //     getRequestsByStatus("rejected");
      //     return;
      // }
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
        getRequests()
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
