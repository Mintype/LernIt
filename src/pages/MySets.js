import React from 'react'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db, auth } from "../firebase-config";
//import { collection, doc, query, where, onSnapshot } from "firebase/firestore";
import {
    collection,
    addDoc,
    getDocs,
    where,
    serverTimestamp,
    onSnapshot,
    query,
    orderBy,
    doc,
    getDoc
  } from "firebase/firestore";

function MySets() {

  const [studyLists, setStudyLists] = useState(null);

  useEffect(() => {
    const fetchStudyGuides = async () => {
      try {
          const querySnapshot = await getDocs(collection(db, 'studylists'));

          const studyGuidesArray = [];

          querySnapshot.forEach((doc) => {
              if (doc.exists()) {
                  const { title, user } = doc.data();
                  const studyGuide = {
                      id: doc.id,
                      user: user,
                      title: title
                  };
                  studyGuidesArray.push(studyGuide);
                  setStudyLists(studyGuidesArray);
              } else {
                  console.log("Document does not exist:", doc.id);
              }
          });

          console.log("Study Guides Array:", studyGuidesArray);
          return studyGuidesArray;
      } catch (error) {
          console.error("Error fetching study guides:", error);
          // Handle error fetching study guides
          return [];
      }
    };

    fetchStudyGuides();

  }, []);


  return (
    <div>
      <h1>Study Lists</h1>
      <ul>
        { studyLists ? (
        
        studyLists.map((guide) => (
          <li key={guide.id}>{guide.title}</li>
        ))

        )
      
        : (
          <p>Loading...</p>
      )
      }
      </ul>
    </div>
  )
}

export default MySets