import React, { useContext, useState } from "react";
import "./Login.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import google from "../../images/google.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { authContext } from "../Provider/AuthProvider";
import { GoogleAuthProvider } from "firebase/auth";

const Login = () => {
   const { emailPassLogin, setUser, user, googleSignIn } = useContext(authContext);
   const [passShow, setPassShow] = useState(false);
   const [err, setErr] = useState("");
   const [success, setSuccess] = useState("");
   const navigate = useNavigate();
   const location = useLocation();
   // console.log(location.state?.from?.pathname || "/");

   const handelToggle = (e) => {
      e.preventDefault();
      setPassShow(!passShow);
   };

   const handelLogin = (e) => {
      e.preventDefault();
      setErr("");
      setSuccess("");
      const email = e.target.email.value;
      const password = e.target.password.value;
      // console.log(email, password);
      emailPassLogin(email, password)
         .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            setUser(user);
            setSuccess("User Login Successful");
            navigate(location.state?.from?.pathname || "/", { replace: true });
         })
         .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErr(errorMessage);
         });
   };
   const handelGoogleSingIn = () => {
      setErr("");
      setSuccess("");
      googleSignIn()
         .then((result) => {
            const user = result.user;
            console.log(user);
            setSuccess("user Login successful");
            navigate(location.state?.from?.pathname || "/", { replace: true });
         })
         .catch((error) => {
            const errorMessage = error.message;
            setErr(errorMessage);

            console.log(error);
         });
   };

   return (
      <div className="user-container">
         <h2 className="page-title">Login</h2>
         <form onSubmit={handelLogin}>
            <div className="from-control">
               <label htmlFor="log-email">Email</label>
               <input type="email" name="email" id="log-email" placeholder="Email" required />
            </div>
            <div className="from-control">
               <label htmlFor="log-password">Password</label>
               <input
                  type={passShow ? "text" : "password"}
                  name="password"
                  id="log-password"
                  placeholder="Password"
                  required
               />
               <button onClick={handelToggle} className="eye-icon">
                  {passShow ? (
                     <FontAwesomeIcon icon={faEye}></FontAwesomeIcon>
                  ) : (
                     <FontAwesomeIcon icon={faEyeSlash}></FontAwesomeIcon>
                  )}
               </button>
            </div>
            <button type="submit" className="btn-submit">
               Login
            </button>
         </form>
         <p className="page-link">
            New to Ema-john?{" "}
            <Link to="/signup" className="link">
               Create New Account.
            </Link>
         </p>
         <p className="btm-line">
            <span>or</span>
         </p>
         <button className="btn-google" onClick={handelGoogleSingIn}>
            <img src={google} alt="" />
            <p>Continue With Google</p>
         </button>
         <p className="err-text">{err}</p>
         <p className="success-text">{success}</p>
      </div>
   );
};

export default Login;
