import { auth } from "../firebase-config.js";
import { signOut } from "firebase/auth";
import NavBar from "./NavBar.js";
import '../styles/AppWrapper.css';

import Cookies from "universal-cookie";

const cookies = new Cookies();

export const AppWrapper = ({ children, isAuth, setIsAuth, setIsInChat }) => {
  const signUserOut = async () => {
    await signOut(auth);
    cookies.remove("auth-token");
    setIsAuth(false);
    setIsInChat(false);
  };

  return (
    <div className="App">
      
      <NavBar/>

      <div className="app-container">{children}</div>
      {isAuth && (
        <div className="sign-out">
          <button onClick={signUserOut}> Sign Out</button>
        </div>
      )}

      <footer>
        <p>Copyright © 2024 Mintype. All rights reserved.</p>
        <p><a href="/terms">Terms of Service</a> | <a href="/privacy">Privacy Policy</a> | <a href="/contact">Contact Us</a></p>
      </footer>

    </div>
  );
};