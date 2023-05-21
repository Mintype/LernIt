import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import './navbar.css';
import NewItemIcon from './newItemIcon.svg';
import { auth } from "./firebase";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
    });

    // Clean up the subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <header>
      <div className="navbar">
        <Link to="/">
          <h1 className="logo">LernIt</h1>
        </Link>
        <ul className="navitems">
          <li className="navitem">
            <Link to="/" className="navlink">Home</Link>
          </li>
          <li className="navitem">
            <Link to="/" className="navlink">Browse</Link>
          </li>
        </ul>
        <input type="text" className="search" placeholder="Search for studying materials."/>
        <Link to="/signup">
          <img src={NewItemIcon} alt="NewItemButton" className="newItemIcon"/>
        </Link>
        {isLoggedIn ? (
          <ul className="navitems">
            <li className="navitem">
              <Link to="/" className="navlink">Logout</Link>
            </li>
          </ul>
        ) : (
          <ul className="navitems">
            <li className="navitem">
              <Link to="/login" className="navlink">Login</Link>
            </li>
            <li className="navitem">
              <Link to="/signup" className="navlink">Signup</Link>
            </li>
          </ul>
        )}
      </div>
    </header>
  );
}
