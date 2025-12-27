import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  updateDoc
} from "firebase/firestore";

// 🔥 Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyALBN8zHKPgRa4kHMnvqIduecsyEegpJv4",
  authDomain: "btechwala-3fa54.firebaseapp.com",
  databaseURL: "https://btechwala-3fa54-default-rtdb.firebaseio.com",
  projectId: "btechwala-3fa54",
  storageBucket: "btechwala-3fa54.firebasestorage.app",
  messagingSenderId: "729085977723",
  appId: "1:729085977723:web:97d00b09fe33f692ba6ede"
};

// init firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function addFieldsToAllDocs() {
  try {
    const colRef = collection(
      db,
      "Important Topics",
      "fourthYear",
      "materials"
    );

    const snapshot = await getDocs(colRef);

    if (snapshot.empty) {
      console.log("❌ No documents found");
      return;
    }

    for (const snap of snapshot.docs) {
      const data = snap.data();
      const updates = {};

      // ✅ meta field
      if (!data.meta) {
        updates.meta =
          data.description ||
          "High-weightage important topics for exam preparation";
      }

      // ✅ points field
      if (!data.points) {
        updates.points = [
          "Unit-wise important topics",
          "PYQ focused content",
          "Last moment revision",
        ];
      }

      if (Object.keys(updates).length > 0) {
        await updateDoc(doc(colRef, snap.id), updates);
        console.log(`✅ Updated: ${snap.id}`);
      } else {
        console.log(`⚠️ Skipped: ${snap.id}`);
      }
    }

    console.log("🎉 All documents updated successfully");
  } catch (err) {
    console.error("❌ Error:", err);
  }
}

addFieldsToAllDocs();
