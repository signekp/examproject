import React from "react";

// funktion der definerer om en bruger er logget ind, logget ud og opretteet
// switch statement, lidt ala en if statement
// state indeholder vores
// actions
const AuthReducer = (state, action) => {
  // action.type repræsenterer vores funktion nan
  switch (action.type) {
    case "LOGIN": {
      return {
        currentUser: action.payload,
      };
    }
    case "LOGOUT": {
      return {
        currentUser: null,
      };
    }
    case "SIGNUP": {
      return {
        currentUser: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default AuthReducer;
