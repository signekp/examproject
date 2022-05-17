import React, { useState, useContext } from "react";
import "./signup.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { collection, addDoc, where, doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import SectionHeader from "../../components/SectionHeader";

export default function SignUp() {
  // variabler
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const [errorMessage, setErrorMessage] = useState(false);

  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  // hvilken funktion formen eksekverer når vi trykker på submit knappen
  const handleLogin = async (e) => {
    e.preventDefault();

    // metode fra firebase
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;

        // tilføjer brugeren til firestore database
        const res = setDoc(doc(db, "users", user.uid), {
          name: name,
          email: email,
          password: password,
        });
        // kører vores SIGNUP case som fortæller hvad der skal ske når vi kører denne
        dispatch({ type: "SIGNUP", payload: user });
        navigate("/allreviews");
      })
      .catch((error) => {
        console.log(error.message);
        setErrorMessage(true);
        // ..
      });
  };

  // onChange listener, sætter email og password til den indtastede værdi
  // e er vores parameter "event"
  const onChangeHandlerEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangeHandlerPassword = (e) => {
    setPassword(e.target.value);
  };

  const onChangeHandlerName = (e) => {
    setName(e.target.value);
  };

  return (
    <div
      className="
    gradient-background"
    >
      <SectionHeader heading="Create your new account" />
      <div className="login">
        {errorMessage && <p className="error-message">User already exist</p>}

        <form onSubmit={handleLogin}>
          <input
            placeholder="Name"
            type="text"
            onChange={onChangeHandlerName}
          />
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
          <button type="submit">Sign up</button>
        </form>
      </div>
    </div>
  );
}
