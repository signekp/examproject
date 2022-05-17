import React, { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";

// i begyndelsen er den null (vi har ingen bruger endnu)
// her henter vi vores bruger fra localStorage med getItem
// hvis der ikke er nogen bruger, så henter den null
// denne variable vi bruger alle steder (currentUser)
const INITIAL_STATE = {
  currentUser: JSON.parse(localStorage.getItem("user") || null),
};

// eksporterer en variable authcontext, vi laver en context som så inderholder vores initial state hvor vi sætter den nuværende bruger til at gemme i localstorage
// vi laver vores context
// vi skaber egentlig en authentication context, som vil pass vores auth state fra dette komponent til ethvert andet komponent som kræver det
export const AuthContext = createContext(INITIAL_STATE);

// context provider, så vi kan nå denne data alle steder
// vi tager children, fordi vi wrapper alle vores komponenter (i index.js) inde i denne, så derfor tager vi children som er under dette. Children er stort set hele vores applikation

// vi skal bruge en reducer som indeholder vores funktioner
export const AuthContextProvider = ({ children }) => {
  // useReducer hook: returnerer vores state som er state og dispatch funktion. Dispatch er vores funktioner fra AuthReducer, så hvis vi bruger login vil den give os login funktionen
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  // hver gang vores currentUser ændres, vil vi gemme detaljerne i localStorage:
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.currentUser));
  }, [state.currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser: state.currentUser, dispatch }}>
      {/*  children er vores applikatiom */}
      {children}
    </AuthContext.Provider>
  );
};
