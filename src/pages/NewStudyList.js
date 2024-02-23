import React, { useState } from 'react';
import { db, auth } from "../firebase-config";
import '../styles/NewStudyList.css';
import {
  collection,
  addDoc,
  where,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

function NewStudyList() {
  const [items, setItems] = useState([]);
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  
  const [title, setTitle] = useState('');

  const addItemToList = () => {
    if (input1 && input2) {
      setItems([...items, { text1: input1, text2: input2 }]);
      setInput1('');
      setInput2('');
    }
  };

  const handleSave = async () => {
    console.log("List saved:", items);

    // Create an array to hold the data to be saved
    const dataToSave = [];
  
    // Loop through items and add them to the data array
    items.forEach(item => {
      dataToSave.push({
        text1: item.text1,
        text2: item.text2//,
        //user: auth.currentUser.displayName
      });
    });

    try {
      // Save the data array to Firestore
      await addDoc(collection(db, "studylists"), {
        items: dataToSave,
        user: auth.currentUser.displayName,
        userId: auth.currentUser.uid, // Save user's ID
        isPublic: true, // or false depending on your logic
        title: title,
        createdAt: serverTimestamp()
      });
  
      console.log("List successfully saved to Firestore.");
    } catch (error) {
      console.error("Error saving list to Firestore:", error);
    }
  };

  // Log the updated list after calling setItems
  React.useEffect(() => {
    console.log("Updated List:", JSON.stringify(items));
  }, [items]);

  return (
    <div>
      <h2>New Study List</h2>
      <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter title"
        />
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item.text1} - {item.text2}</li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          value={input1}
          onChange={(e) => setInput1(e.target.value)}
          placeholder="Enter Text 1"
        />
        <input
          type="text"
          value={input2}
          onChange={(e) => setInput2(e.target.value)}
          placeholder="Enter Text 2"
        />
        <button onClick={addItemToList}>Add to List</button>
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
}

export default NewStudyList;
