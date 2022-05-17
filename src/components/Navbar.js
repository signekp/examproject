import React, { useContext } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";

export default function Navbar(props) {
  const { dispatch } = useContext(AuthContext);

  // log ud funktion, hvad der sker når vi klikker på "Logout"
  // logud funktion fra firebase
  // dispatch fra vores AuthContext / Authreducer, hvor vi bruger logout casen og sætter user i localstorage til null
  const handleSignOut = () => {
    // sign out funktion fra firebase
    signOut(auth)
      .then(() => {
        // fjerner den gemte bruger fra localstorage
        dispatch({ type: "LOGOUT" });
        console.log("signout suceeded!");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="header">
      <ul>
        <Link to="/allreviews">
          <li>See all reviews</li>
        </Link>
        <Link to="/create">
          <li>Create a new review</li>
        </Link>

        {props.currentUser ? (
          <Link to="/">
            <li onClick={handleSignOut}>Logout</li>
          </Link>
        ) : (
          <Link to="/login">
            <li>Login</li>
          </Link>
        )}
      </ul>
    </div>
  );
}
