 
      import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
      import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-analytics.js";

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
      const db = getFirestore(app);
    
      //   --------------------------------------------------------------------------------
      const firstNameInput = document.getElementById('first-name');
      const email=localStorage.getItem("email") ;
      const lastNameInput = document.getElementById('last-name');
      const phoneNumberInput = document.getElementById('phone-number');
      const dateOfBirthInput = document.getElementById('date-of-birth');
      const idNumberInput = document.getElementById('id-number');
      const genderInput = document.querySelector('input[name="gender"]:checked');
      const bloodTypeInput = document.getElementById('blood-type');
      const heightInput = document.getElementById('height');
      const heightUnitInput = document.getElementById('height-unit');
      const weightInput = document.getElementById('weight');
      const weightUnitInput = document.getElementById('weight-unit');
      const countryInput = document.getElementById('country');
      const provinceInput = document.getElementById('province');
      const cityInput = document.getElementById('city');
      const medicalConditionInput = document.querySelector('input[name="medical_condition"]:checked');
      const tattooInput = document.querySelector('input[name="tattoo"]:checked');
      const medicalConditionNotesInput = document.getElementById('medical-condition');
     document.getElementById("submit-btn").addEventListener("click",()=>{
      updateSpecificDocument()   
     
     });   
     async function updateSpecificDocument(){
      const email=localStorage.getItem("email") ;
      console.log(email)
      const db=getFirestore();
           let ref=doc(db,"MedicalInfo",email)
           
           await updateDoc(ref,{
            firstName: firstNameInput.value,
            lastName: lastNameInput.value,
            phoneNumber: phoneNumberInput.value,
            dateOfBirth: dateOfBirthInput.value,
            idNumber: idNumberInput.value,
            gender: genderInput ? genderInput.value : '',
            bloodType: bloodTypeInput.value,
            height: heightInput.value,
            heightUnit: heightUnitInput.value,
            weight: weightInput.value,
            weightUnit: weightUnitInput.value,
            country: countryInput.value,
            province: provinceInput.value,
            city: cityInput.value,
            medicalCondition:medicalConditionNotesInput ? medicalConditionNotesInput.value : 'none',
            tattoo: tattooInput ? tattooInput.value : 'none',
            medicalConditionNotes: medicalConditionNotesInput.value
            
               }).then(()=>{
                   console.log("added done")
               }).catch((err)=>{
                   console.log(err)
               })
          }
          //data.firstName;
          getSpecificDocument()
          async function getSpecificDocument() {
            let ref = doc(db, "MedicalInfo", localStorage.getItem("email"));
            const data = await getDoc(ref);
            if (data.exists()) {
             
        document.getElementById('first-name').value = data.data().firstName || '';
        document.getElementById('last-name').value = data.data().lastName || '';
        document.getElementById('phone-number').value = data.data().phone || '';
        document.getElementById('date-of-birth').value = data.data().dateOfBirth || '';
        document.getElementById('id-number').value = data.data().idNumber || '';
        // document.getElementById(data.gender).checked = true; // Assuming gender is stored as either "male" or "female"
        document.getElementById('blood-type').value = data.data().bloodType || '';
        document.getElementById('height').value = data.data().height || '';
        document.getElementById('height-unit').value = data.data().heightUnit || '';
        document.getElementById('weight').value = data.data().weight || '';
        document.getElementById('weight-unit').value = data.data().weightUnit || '';
        document.getElementById('country').value = data.data().country || '';
        document.getElementById('province').value = data.data().province || '';
        document.getElementById('city').value = data.data().city || '';
//document.getElementById('medical-condition-yes').checked = data.data().medicalCondition === 'yes';
  //       document.getElementById('medical-condition-no').checked = data.data().medicalCondition === 'no';
    //    document.getElementById('tattoo-yes').checked = data.data().tattoo === 'yes';
     //   document.getElementById('tattoo-no').checked = data.data().tattoo === 'no';
        console.log(data.data().medicalCondition
      )
        document.getElementById('medical-condition').value = data.data().medicalCondition
        || '';
   
            } else {
              console.log("no data");
            }
          }

   

    
    