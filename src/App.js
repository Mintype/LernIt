import React, { useState, useEffect } from "react";
import logo from './logo.svg';
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Auth } from "./components/Auth.js";
import NewStudyList from "./pages/NewStudyList.js";
import About from "./pages/About.js";
import Home from "./pages/Home.js";
import Search from "./pages/Search.js";
import MySets from "./pages/MySets.js";
import UserInfo from "./pages/UserInfo.js";
import StudyList from "./pages/StudyList.js";
import TermsOfService from "./pages/TermsOfService.js";
import { AppWrapper } from "./components/AppWrapper";
import Cookies from "universal-cookie";
import './App.css';
import Privacy from "./pages/Privacy.js";
import Contact from "./pages/Contact.js";

const cookies = new Cookies();

function App() {
  const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));

  if (!isAuth) {
    return (
      <AppWrapper
        isAuth={isAuth}
        setIsAuth={setIsAuth}
      >
        <Auth setIsAuth={setIsAuth} />
      </AppWrapper>
    );
  }
  
  return (
    <AppWrapper>
      <Router>
        <Routes>
          <Route path="/LernIt" element={<Home />} />
          <Route path="/LernIt/new" element={<NewStudyList />} />
          <Route path="/LernIt/list/:id" element={<StudyList />} />
          <Route path="/LernIt/about" element={<About />} />
          <Route path="/LernIt/search/:id" element={<Search />} />
          <Route path="/LernIt/search" element={<Search />} />
          <Route path="/LernIt/mysets" element={<MySets />} />
          <Route path="/LernIt/me" element={<UserInfo />} />
          <Route path="/LernIt/terms" element={<TermsOfService />} />
          <Route path="/LernIt/privacy" element={<Privacy />} />
          <Route path="/LernIt/contact" element={<Contact />} />
        </Routes>
      </Router>
    </AppWrapper>
  );
}

export default App;
