import React, { useEffect, useState } from "react";
import fireDb from "../firebase";
import { getAuth } from "firebase/auth";

//2.
export const AuthContext = React.createContext();

//3.
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
const auth = getAuth(fireDb);
  useEffect(() => {
    auth.onAuthStateChanged(setUser);
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};