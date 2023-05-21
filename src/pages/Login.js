import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import './Login.css';

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = (e) => { 
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        navigate('/'); // Navigate to the home page after successful signup
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <main className="main">
      <form action="/" method="get" onSubmit={signIn} className="form">
        <h1 className="title">Log In</h1>
        <label htmlFor="email" className="label">Email:</label>
        <input type="email" id="email" name="email" className="input" value={email} onChange={(e) => setEmail(e.target.value)}/>
        <label htmlFor="password" className="label" required>Password:</label>
        <input type="password" id="password" name="password" minLength="8" maxLength="128" required className="input" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <input type="submit" value="Submit" className="submitButton"/>
      </form>
    </main>
  );
}
