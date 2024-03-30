import React, { useState, useEffect } from 'react';
import { auth } from "../firebase-config";
import '../styles/userinfo.css';

function UserInfo() {
  const [displayName, setDisplayName] = useState('Unknown User');
  const [photoURL, setPhotoURL] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const name = user.displayName;
        const photoURL = user.photoURL; // Get the user's profile picture URL
        if (name) {
          setDisplayName(name);
        }
        if (photoURL) {
          setPhotoURL(photoURL);
          console.log("Photo URL:", photoURL);
        }
      } else {
        setDisplayName('Unknown User');
        setPhotoURL(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>User Information</h1>
      <h1>{displayName}</h1>
      {photoURL && <img className='profileImage' src={photoURL} alt="Profile" />}
    </div>
  );
}

export default UserInfo;
