import React, { useContext, useState } from "react";
import Navbar from "./components/Navbar";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import Login from "../src/pages/login/Login";
import "./main.css";
import SignUp from "./pages/signup/SignUp";
import AllReviews from "./pages/allreviews/AllReviews";
import { AuthContext } from "./context/AuthContext";
import Create from "./pages/create/Create";
import Home from "./pages/home/Home";

function App() {
  // her henter vi den nuværender bruger fra vores authContext
  const { currentUser } = useContext(AuthContext);

  // hvis en bruger er logget ind så bliver den gemt i localstorage og så kan man tilgå siden der bruger dette komponent, ellers navigeres man til /login siden
  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  return (
    <div>
      <BrowserRouter>
        <Navbar currentUser={currentUser} />
        <Routes>
          <Route
            path="/create"
            element={
              <RequireAuth>
                <Create />
              </RequireAuth>
            }
          ></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/allreviews" element={<AllReviews />}></Route>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
