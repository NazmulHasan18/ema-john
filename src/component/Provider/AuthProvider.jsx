import React, { createContext, useEffect, useState } from "react";
import {
   GoogleAuthProvider,
   createUserWithEmailAndPassword,
   getAuth,
   onAuthStateChanged,
   signInWithEmailAndPassword,
   signInWithPopup,
   signOut,
} from "firebase/auth";
import app from "../../firebase/firebase.config";

export const authContext = createContext(null);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
   const [passShow, setPassShow] = useState(false);
   const [loading, setLoading] = useState(true);
   const [user, setUser] = useState(null);
   const handelToggle = (e) => {
      e.preventDefault();
      setPassShow(!passShow);
   };

   const emailPassLogin = (email, password) => {
      setLoading(true);
      return signInWithEmailAndPassword(auth, email, password);
   };
   const emailPassSingUp = (email, password) => {
      setLoading(true);
      return createUserWithEmailAndPassword(auth, email, password);
   };
   const logOut = () => {
      return signOut(auth);
   };
   const googleSignIn = () => {
      setLoading(true);
      return signInWithPopup(auth, googleProvider);
   };

   useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
         setUser(user);
         setLoading(false);
         console.log(user);
      });
      return () => {
         return unsubscribe();
      };
   }, []);

   const authInfo = {
      user,
      emailPassLogin,
      emailPassSingUp,
      handelToggle,
      passShow,
      setUser,
      loading,
      logOut,
      googleSignIn,
   };

   return <authContext.Provider value={authInfo}>{children}</authContext.Provider>;
};

export default AuthProvider;
