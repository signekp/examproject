import React, { useState, useContext } from "react";
import "./login.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import SectionHeader from "../../components/SectionHeader";
import { Link } from "react-router-dom";

export default function Login(props) {
  const [errorMessage, setErrorMessage] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // vi bruger dispatch til at registere et login
  const { dispatch } = useContext(AuthContext);

  // login funktion, direkte fra firebase
  // https://firebase.google.com/docs/auth/web/password-auth
  const handleLogin = (e) => {
    e.preventDefault();

    // returnerer et promise: gør dette, hvis ikke så fang fejlen
    // tager auth (firebase), email og password fra useState som parametrer
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        // reference til vores cases i AuthReducer, som kommer fra firebase
        // vi behøver dette ift. at komme ind på create siden som er beskyttet til brugere
        dispatch({ type: "LOGIN", payload: user });
        navigate("/allreviews");
      })
      .catch((error) => {
        console.log(error.message);
        setErrorMessage(true);
      });
  };

  // onChange funktioner - lytter til ændringer i input felt
  const onChangeHandlerEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangeHandlerPassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div
      className="
    gradient-background"
    >
      <SectionHeader heading="Login to create a review" />
      <div className="login">
        {errorMessage && <p>Wrong email or password</p>}
        <p className="no--user">
          Dont have a user yet? <Link to="/signup">Sign in here</Link>
        </p>
        <form onSubmit={handleLogin}>
          <input
            placeholder="Email"
            type="email"
            onChange={onChangeHandlerEmail}
          />
          <input
            placeholder="Kodeord"
            type="password"
            onChange={onChangeHandlerPassword}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
