import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// 🔥 Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyALBN8zHKPgRa4kHMnvqIduecsyEegpJv4",
  authDomain: "btechwala-3fa54.firebaseapp.com",
  projectId: "btechwala-3fa54",
  storageBucket: "btechwala-3fa54.appspot.com",
  messagingSenderId: "729085977723",
  appId: "1:729085977723:web:97d00b09fe33f692ba6ede",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ✅ ALL SUB-SUBJECT DATA (Quantum)
const quantumData = [
    {
      title: "Programming for Problem Solving (PPS)",
      meta: "Core C programming concepts for exams",
      points: [
        "Basic Syntax & Data Types",
        "Loops and Conditions",
        "Arrays & Strings",
        "Functions",
        "Pointers & Structures"
      ],
      downloadUrl: "https://example.com/pps.pdf"
    },
    {
      title: "Engineering Physics",
      meta: "High-weightage theory & numericals",
      points: [
        "Quantum Mechanics",
        "Wave Optics",
        "Semiconductors",
        "Laser Technology",
        "Crystal Structure"
      ],
      downloadUrl: "https://example.com/physics.pdf"
    },
    {
      title: "Basic Electrical Engineering",
      meta: "Important electrical fundamentals",
      points: [
        "Ohm’s Law & Kirchhoff Laws",
        "AC & DC Circuits",
        "Transformers",
        "Electrical Machines",
        "Power Factor"
      ],
      downloadUrl: "https://example.com/electrical.pdf"
    },
    {
      title: "Electronics Engineering",
      meta: "Important semiconductor & circuit topics",
      points: [
        "Diodes & Rectifiers",
        "Transistors",
        "Amplifiers",
        "Logic Gates",
        "Operational Amplifiers"
      ],
      downloadUrl: "https://example.com/electronics.pdf"
    },
    {
      title: "Environmental Studies",
      meta: "Scoring & theory-based subject",
      points: [
        "Ecosystem & Biodiversity",
        "Environmental Pollution",
        "Natural Resources",
        "Climate Change",
        "Sustainable Development"
      ],
      downloadUrl: "https://example.com/environment.pdf"
    },
    {
      title: "Mathematics – I",
      meta: "Core mathematics for engineering",
      points: [
        "Matrices & Determinants",
        "Limits & Continuity",
        "Differentiation",
        "Applications of Derivatives",
        "Vector Algebra"
      ],
      downloadUrl: "https://example.com/maths1.pdf"
    },
    {
      title: "Mathematics – II",
      meta: "Advanced mathematics topics",
      points: [
        "Integral Calculus",
        "Differential Equations",
        "Laplace Transform",
        "Fourier Series",
        "Probability & Statistics"
      ],
      downloadUrl: "https://example.com/maths2.pdf"
    },
    {
      title: "Soft Skills",
      meta: "Personality & communication development",
      points: [
        "Communication Skills",
        "Group Discussion",
        "Interview Skills",
        "Presentation Skills",
        "Professional Ethics"
      ],
      downloadUrl: "https://example.com/softskills.pdf"
    }
  ];
  

// 🔥 UPLOAD FUNCTION
const uploadData = async () => {
  const collectionRef = collection(db, "quantum", "firstYear", "materials");

  for (const item of quantumData) {
    await addDoc(collectionRef, item);
    console.log("Uploaded:", item.title);
  }

  console.log("✅ All Quantum Data Uploaded Successfully");
};

uploadData();
