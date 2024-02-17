import React from 'react'
import { useState, useEffect } from 'react';
import '../styles/navbar.css';
import { ReactSearchAutocomplete } from 'react-search-autocomplete'
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

function NavBar() {

    let items2 = [
      {
        id: 0,
        name: 'foods'
      },
      {
        id: 1,
        name: 'spanish words'
      }
    ]
    
    const [items, setItems] = useState(null);

    useEffect(() => {
      const fetchAllStudyListTitles = async () => {
        try {
          const querySnapshot = await getDocs(collection(db, 'studylists'));
          let id = 0; // Initialize ID counter
          const titles = [];
          querySnapshot.forEach(doc => {
            if (doc.exists) { // Corrected: removed parentheses after exists
              const data = doc.data();
              if (data && data.title) {
                titles.push({ id: id++, name: data.title }); // Increment ID for each item
              } else {
                console.log(`Document ${doc.id} is missing title.`);
              }
            } else {
              console.log(`Document ${doc.id} does not exist.`);
            }
          });
          console.log("Titles list:", titles);
          setItems(titles); // Update state with fetched titles
        } catch (error) {
          console.error("Error fetching study lists:", error);
        }
      };
      
      fetchAllStudyListTitles(); // Call the function directly
    
    }, []); // Empty dependency array means this effect runs only once, on mount
    
    useEffect(() => {
      console.log("Items list:", items); // Log items whenever it changes
    }, [items]); // Log whenever items changes
    
    

/*
    const fetchAllStudyListTitles = async () => {
      try {
          const querySnapshot = await getDocs(collection(db, 'studylists'));
          let id = 0; // Initialize ID counter
          const titles = [];
          querySnapshot.forEach(doc => {
              if (doc.exists()) {
                  const data = doc.data();
                  if (data && data.title) {
                      titles.push({ id: id++, title: data.title }); // Increment ID for each item
                  } else {
                      console.log(`Document ${doc.id} is missing title.`);
                  }
              } else {
                  console.log(`Document ${doc.id} does not exist.`);
              }
          });
          console.log("Titles list:", titles);
          return titles;
      } catch (error) {
          console.error("Error fetching study lists:", error);
          return [];
      }
    };
    
    items = fetchAllStudyListTitles();*/
    
      const handleOnSearch = (string, results) => {
        // onSearch will have as the first callback parameter
        // the string searched and for the second the results.
        console.log(string, results)
      }
    
      const handleOnHover = (result) => {
        // the item hovered
        console.log(result)
      }
    
      const handleOnSelect = (item) => {
        // the item selected
        console.log(item)
      }
    
      const handleOnFocus = () => {
        console.log('Focused')
      }
    
      const formatResult = (item) => {
        return (
            <span style={{ display: 'block', textAlign: 'left' }}>{item.name}</span>
        )
      }

  return (
    <div>
        <ul className="navbar">
            <li className="title" id="nav-item"><a href="/">LernIt</a></li>
            <li className="nav-item" id="nav-item"><a href="/mysets">My Sets</a></li>
            <li className="nav-item" id="nav-item"><a href="/new">New</a></li>


            {items !== null ? (
        <ReactSearchAutocomplete
        className="nav-search"
        placeholder="Search.."
        inputDebounce="200"
        maxLength="100"
        items={items}
        onSearch={handleOnSearch}
        onHover={handleOnHover}
        onSelect={handleOnSelect}
        onFocus={handleOnFocus}
        autoFocus
        formatResult={formatResult}
        styling={{
            height: "35px"
        }}
    />
) : (
        <ReactSearchAutocomplete
        className="nav-search"
        placeholder="Search.."
        inputDebounce="200"
        maxLength="100"
        items={[]}
        onSearch={handleOnSearch}
        onHover={handleOnHover}
        onSelect={handleOnSelect}
        onFocus={handleOnFocus}
        autoFocus
        formatResult={formatResult}
        styling={{
            height: "35px"
        }}
        />
)}


{/*
            <ReactSearchAutocomplete
            className="nav-search"
            placeholder="Search.."
            inputDebounce="200"
            items={items}
            onSearch={handleOnSearch}
            onHover={handleOnHover}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}
            autoFocus
            formatResult={formatResult}
            styling={{
                height: "35px"
            }}
            />

          */}

            <li className="nav-item" id="nav-item"><a href="/about">About</a></li>
            <li className="nav-item" id="nav-item"><a href="/me">Me</a></li>
        </ul>
    </div>
  )
}

export default NavBar