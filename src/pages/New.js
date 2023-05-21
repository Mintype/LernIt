import React from 'react'
import AuthDetails from './AuthDetails'
import { auth } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function New() {

    const createStudyList = async (studyListData) => {
        try {
          const studyListRef = collection(db, "studylists");
          console.log(currentUser)
          await addDoc(studyListRef, studyListData);
          console.log("Study list added successfully!");
        } catch (error) {
          console.log("Error adding study list:", error);
        }
      };
      
      const currentUser = auth.currentUser;
      const userEmail = currentUser ? currentUser.email : ""; // Get the email of the current user
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
          // Add more flashcards as needed
        ],
        author: userEmail // Set the author attribute to the user's email
      };   
      
      const handleCreateStudyList = () => {
        createStudyList(newStudyList);
      };

  return (
    <>
    <br/><br/><br/><br/><br/>
    <AuthDetails/>
    <button onClick={handleCreateStudyList}>Create Study List</button>
    </>
  )
}