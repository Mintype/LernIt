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
  const [displayName, setDisplayName] = useState('Stranger');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const name = user.displayName;
        if (name) {
          setDisplayName(name);
        }
      } else {
        setDisplayName('Stranger');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return(
      
    <div className='home-page'>
    <h1>Welcome!</h1>
    </div>
    )
  }
  return (
    <div className='home-page'>
      <h1>Welcome, {displayName}!</h1>
      <div className='list-container'>
        <h2 className='list-container-title'>Recent Study Lists</h2>
        <div className='list-item-container'>
          <div className='exampleBox'>empty box 😔</div>
        </div>
      </div>
      <div className='list-container'>
        <h2 className='list-container-title'>Trending Study Lists</h2>
        <div className='list-item-container'>
          <div className='exampleBox'>empty box 😔</div>
        </div>
      </div>
      <div className='list-container'>
        <h2 className='list-container-title'>Your Study Lists</h2>
        <div className='list-item-container'>
          <div className='exampleBox'>empty box 😔</div>
        </div>
      </div>
    </div>
  )
}

export default Home