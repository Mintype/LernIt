import React from 'react'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db, auth } from "../firebase-config";
//import { collection, doc, query, where, onSnapshot } from "firebase/firestore";
import {
    collection,
    addDoc,
    where,
    serverTimestamp,
    onSnapshot,
    query,
    orderBy,
    doc,
    getDoc
  } from "firebase/firestore";

function StudyList() {
    const { id } = useParams();
    const [studyList, setStudyList] = useState(null);
/*
    const handleSave = async () => {

        const docRef = doc(db, 'studylists', id); // replace 'your-collection-name' and 'your-document-id' with your collection name and document ID
        const docSnap = await getDoc(docRef);
      
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
        } else {
          console.log("No such document!");
        }

    }
*/

    useEffect(() => {
        const fetchData = async () => {
        try {
            const docRef = doc(db, 'studylists', id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const data = docSnap.data();
                if (data && data.items) {
                    setStudyList(data);
                } else {
                    console.log("Document data is invalid.");
                }

            console.log("Document data:", docSnap.data().items[0].text1);
            } else {
            console.log("No such document!");
            // Handle the case where the document doesn't exist
            }
        } catch (error) {
            console.error("Error fetching document:", error);
            // Handle error fetching document
        }
        };

        fetchData();
    }, [id]); // Run effect whenever id changes

    return (
        <div>
        {studyList ? (
            <div>
                <h1>{studyList.title}</h1>
                <h2>By: {studyList.user}</h2>
                {studyList.items.map((item, index) => (
                    <div key={index}>
                        <h3>{item.text1}</h3>
                        <h3>{item.text2}</h3>
                    </div>
                ))}
            </div>
        ) : (
            <p>Loading...</p>
        )}
    </div>
    );
}

export default StudyList;
