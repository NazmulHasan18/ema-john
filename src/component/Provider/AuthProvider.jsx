import React, { createContext, useEffect, useState } from "react";
import {
   createUserWithEmailAndPassword,
   getAuth,
   onAuthStateChanged,
   signInWithEmailAndPassword,
} from "firebase/auth";
import app from "../../firebase/firebase.config";

export const authContext = createContext(null);

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
   const [passShow, setPassShow] = useState(false);
   const handelToggle = (e) => {
      e.preventDefault();
      setPassShow(!passShow);
   };

   const [user, setUser] = useState();
   const emailPassLogin = (email, password) => {
      return signInWithEmailAndPassword(auth, email, password);
   };
   const emailPassSingUp = (email, password) => {
      return createUserWithEmailAndPassword(auth, email, password);
   };

   useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (result) => {
         setUser(result.user);
      });
      return unsubscribe();
   }, []);

   const authInfo = {
      user,
      emailPassLogin,
      emailPassSingUp,
      handelToggle,
      passShow,
      setUser,
   };

   return <authContext.Provider value={authInfo}>{children}</authContext.Provider>;
};

export default AuthProvider;
