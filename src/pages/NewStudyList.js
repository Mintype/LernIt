import React, { useEffect, useState } from 'react';
import AuthDetails from './AuthDetails';
import { auth } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from 'react-router-dom';

export default function NewStudyList() {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const createStudyList = async (studyListData) => {
    try {
      const studyListRef = collection(db, "studylists");
      const docRef = await addDoc(studyListRef, studyListData);
      console.log("Study list added successfully! Document ID:", docRef.id);
      navigate(`/new/${docRef.id}`); // Navigate to "/new" with the ID of the new document
    } catch (error) {
      console.log("Error adding study list:", error);
    }
  };

  const currentUser = auth.currentUser;
  const userEmail = currentUser ? currentUser.email : "";

  const newStudyList = {
    title: "My Study List",
    flashcards: [
      {
        question: "What is the capital of France?",
        answer: "Paris"
      },
      {
        question: "What is the symbol for Iron?",
        answer: "Fe"
      },
    ],
    author: userEmail
  };

  useEffect(() => {
      createStudyList(newStudyList);
    }, []); // Dependency array with studyListCreated variable

  return (
    <>
    </>
  );
}
