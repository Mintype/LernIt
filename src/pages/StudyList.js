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
  import '../styles/StudyList.css';

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
        <>
        {studyList ? (

            <div className='studylist-container'>
                <div className='container-halves'>
                    <h1>{studyList.title}</h1>
                    <h2>By: {studyList.user}</h2>
                </div>
                <div className='container-halves' id='half2'>

                    {studyList.items.map((item, index) => (
                        <div className='list-item-pair' key={index}>
                            <div className='list-item'>{item.text1}</div>
                            <div className='list-item'>{item.text2}</div>
                        </div>
                    ))}

                    {/* <div className='list-item-pair'>
                        <div className='list-item'></div>
                        <div className='list-item'></div>
                    </div>
                    <div className='list-item-pair'></div> */}
                </div>
            </div>

            // <div>
            //     <h1>{studyList.title}</h1>
            //     <h2>By: {studyList.user}</h2>
            //     {studyList.items.map((item, index) => (
            //         <div key={index}>
            //             <h3>{item.text1}</h3>
            //             <h3>{item.text2}</h3>
            //         </div>
            //     ))}
            // </div>
        ) : (
            <p>Loading...</p>
        )}
    </>
    );
}

export default StudyList;
