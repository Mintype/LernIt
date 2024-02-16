import React, { useState } from 'react';
import { db, auth } from "../firebase-config";
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

  const messagesRef = collection(db, "studylists");

  const addItemToList = () => {
    if (input1 && input2) {
      setItems([...items, { text1: input1, text2: input2 }]);
      setInput1('');
      setInput2('');
      //console.log("Updated List:", JSON.stringify(items));
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
        text2: item.text2,
        user: auth.currentUser.displayName
      });
    });

    try {
      // Save the data array to Firestore
      await addDoc(collection(db, "studylists"), {
        items: dataToSave,
        createdAt: serverTimestamp()
      });
  
      console.log("List successfully saved to Firestore.");
    } catch (error) {
      console.error("Error saving list to Firestore:", error);
    }

/*
    await db.collection("studylists").add({
      items: items.map(item => ({ text1: item.text1, text2: item.text2 }))//,
      //createdAt: serverTimestamp(),
      // You can add more fields here if needed
    });*/

    // You can add further logic here to save the list to a database or perform any other action.
  };

  // Log the updated list after calling setItems
  React.useEffect(() => {
    console.log("Updated List:", JSON.stringify(items));
  }, [items]);

  return (
    <div>
      <h2>New Study List</h2>
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
