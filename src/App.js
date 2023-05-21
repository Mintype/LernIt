import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NewStudyList from './pages/NewStudyList';
import New from './pages/New';

function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/newstudylist" element={<NewStudyList/>}/>
        <Route path="/new" element={<New/>}/>
      </Routes>
    </>
  );
}

export default App;
