import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-analytics.js";
import {
  getAuth,
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

import {
  getFirestore,
  doc,
  getDoc,
  getDocs, //get all documents inside one collection
  collection,
  query,
  where,
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
const db = getFirestore();
const auth = getAuth();
let usersCount = 0;
let donationCount = 0;

// --------------------------------
// Reference to the "user" collection
const userCollectionRef = collection(db, "users");
const donationRequestCollectionRef = collection(db, "DonationRequests");

// Function to count documents in "user" collection
async function countUserDocuments() {
  try {
    const querySnapshot = await getDocs(userCollectionRef);
    usersCount = querySnapshot.size;
    setupDashbord();
    console.log("Number of documents in 'user' collection:", usersCount);
  } catch (error) {
    console.error("Error getting documents: ", error);
  }
}
document.getElementById("sign-out-btn").addEventListener("click", () => {
 
  
  const confirmation = confirm("Are you sure you want to logout?");

  // If user clicks "OK", redirect to index.html
  if (confirmation) {
    localStorage.clear();
    window.location.href = "../index.html";
    
  }

});

countDonationRequestDocuments();
countDonationDocuments();
async function countDonationDocuments() {
  try {
    const q = query(
      donationRequestCollectionRef,
      where("status", "==", "accepted"),
      where("centerEmail", "==", localStorage.getItem("email"))
    );
    const querySnapshot = await getDocs(q);
    const counter = querySnapshot.size;
    console.log("the counter is  ",counter)
    document.getElementById("accepted-donation").innerHTML = counter;
  } catch (error) {
    console.error("Error getting documents: ", error);
  }
}
async function countDonationRequestDocuments() {
  try {
    const q = query(
      donationRequestCollectionRef,
      // where("status", "==", "pendding"),
      where("centerEmail", "==", localStorage.getItem("email"))
    );
    const querySnapshot = await getDocs(q);
    donationCount = querySnapshot.size;
    document.getElementById("donation-counter").innerHTML = donationCount;
  } catch (error) {
    console.error("Error getting documents: ", error);
  }
}
function setupDashbord() {
  document.getElementById("users-counter").innerHTML = usersCount;
}

async function countUsersInProvince() {
  // Define an empty object to store the counts
  const provinceCounts = {
    Beirut: 0,
    "Mount Lebanon": 0,
    "North Governorate": 0,
    "South Governorate": 0,
    "Beqaa Governorate": 0,
    "Baalbek-Hermel Governorate": 0,
  };

  try {
    // Get a snapshot of all users
    const usersSnapshot = await getDocs(collection(db, "MedicalInfo"));

    // Loop through each user document
    usersSnapshot.forEach((userDoc) => {
      // Get the province from the user document data
      const province = userDoc.data().province;

      // If the province is already in the counts object, increment its count
      if (provinceCounts[province]) {
        provinceCounts[province]++;
      }
      // If the province is not in the counts object, initialize its count to 1
      else {
        provinceCounts[province] = 1;
      }
    });

    // Log the counts for each province
    console.log("User counts by province:", provinceCounts);
    graph(provinceCounts);
  } catch (error) {
    console.error("Error counting users by province:", error);
  }
}
countUsersInProvince();
// Call the function to count documents
countUserDocuments();
function graph(provinceCounts) {
  const ctx = document.getElementById("myChart").getContext("2d");
  const myChart = new Chart(ctx, {
    type: "polarArea",
    data: {
      labels: [
        "Beirut",
        "Mount Lebanon",
        "North Governorate",
        "South Governorate",
        "Beqaa Governorate",
        "Baalbek-Hermel Governorate",
      ],
      datasets: [
        {
          label: "users",
          data: [
            provinceCounts["Beirut"],
            provinceCounts["Mount Lebanon"],
            provinceCounts["North Governorate"],
            provinceCounts["South Governorate"],
            provinceCounts["Beqaa Governorate"],
            provinceCounts["Baalbek-Hermel Governorate"],
          ],
          backgroundColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
    },
  });
}
getBloodValues();
graph();

async function getBloodValues() {
  let bloodsValue = [];

  let ref = doc(db, "BloodBanks", localStorage.getItem("email"));
  const docSnap = await getDoc(ref);
  if (docSnap.exists()) {
    const data = docSnap.data();
    console.log(docSnap.data());
    const APlus = data["A+"];
    const BPlus = data["B+"];
    const AMinus = data["A-"];
    const BMinus = data["B-"];
    const ABPlus = data["AB+"];
    const ABMinus = data["AB-"];
    const OPlus = data["O+"];
    const OMinus = data["O-"];
    bloodsValue = [
      APlus,
      AMinus,
      BPlus,
      BMinus,
      ABPlus,
      ABMinus,
      OPlus,
      OMinus,
    ];
    console.log(bloodsValue);
    updateChartTwo(bloodsValue);
  } else {
    console.log("no data");
  }
}
function updateChartTwo(bloodsValue) {
  const ctx2 = document.getElementById("myChart2").getContext("2d");
  const myChart2 = new Chart(ctx2, {
    type: "bar",
    data: {
      labels: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      datasets: [
        {
          label: "Bloods Bank",
          data: [
            bloodsValue[0],
            bloodsValue[1],
            bloodsValue[2],
            bloodsValue[3],
            bloodsValue[4],
            bloodsValue[5],
            bloodsValue[6],
            bloodsValue[7],
          ],
          backgroundColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
            "rgba(255, 159, 64, 1)",
            "rgba(255, 99, 132, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
    },
  });
}
