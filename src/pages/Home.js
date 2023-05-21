import React from 'react';
import './Home.css';
import AuthDetails from './AuthDetails';

export default function Home() {
  return (
    <div className="background">
        <h1 className="title title-animation">Study Smarter. Not Harder.</h1>
        <h3 className="description">Save hours of studying with more efficent study tools.</h3>
        <a href="/signup" className="signupButton">Signup</a>
        <AuthDetails/>
    </div>
  );
}
