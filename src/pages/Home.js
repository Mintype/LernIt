import React, { useState, useEffect } from 'react';
import '../styles/Home.css';
import { UserStudySets } from "../components/UserStudySets.js";
import { db, auth } from "../firebase-config";
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

function Home() {
  const [displayName, setDisplayName] = useState('');
  const [studyLists, setStudyLists] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const name = user.displayName;
        if (name) {
          setDisplayName(", " + name);
        }
      } else {
        setDisplayName('Stranger');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchStudyGuides = async () => {
      try {
          const querySnapshot = await getDocs(collection(db, 'studylists'));

          const studyGuidesArray = [];

          querySnapshot.forEach((doc) => {
              if (doc.exists()) {
                  const { title, user, userId } = doc.data();
                  const studyGuide = {
                      id: doc.id,
                      userid: userId,
                      user: user,
                      title: title
                  };

                  // for testing purposes.
                  console.log("guide id: " + studyGuide["userid"]);
                  console.log("user id: " + auth.currentUser.uid);
                  console.log("user id: " + auth.currentUser.uid + "\n");
                  
                  // only adds studylist if user made it.
                  if(studyGuide["userid"] == auth.currentUser.uid)
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

  // if (loading) {
  //   return(
      
  //   <div className='home-page'>
  //   <h1>Welcome!</h1>
  //   </div>
  //   )
  // }
  return (
    <div className='home-page'>
      <h1>Welcome{displayName}!</h1>
      <div className='list-container'>
        <h2 className='list-container-title'>Recent Study Lists</h2>
        <div className='list-item-container'>

        </div>
      </div>
      <div className='list-container'>
        <h2 className='list-container-title'>Trending Study Lists</h2>
        <div className='list-item-container'>
          
        </div>
      </div>
      <div className='list-container'>
        <h2 className='list-container-title'>Your Study Lists</h2>
        <div className='list-item-container'>
          { studyLists ? (
            studyLists.map((guide) => (

              <a className='box-a' href={`/list/${guide.id}`}>
                <div className='exampleBox' key={guide.id}> <p>{guide.title}</p> </div> 
              </a>
            ))
          ) : ( <div className='exampleBox'>study list loading... 😔</div> )}
        </div>
      </div>
    </div>
  )
}

export default Home