import React, { useContext, useState } from "react";
import "./SignUp.css";
import { Form, Link } from "react-router-dom";
import google from "../../images/google.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { authContext } from "../Provider/AuthProvider";

const SignUp = () => {
   const { handelToggle, passShow, emailPassSingUp } = useContext(authContext);
   const [err, setErr] = useState("");
   const [success, setSuccess] = useState("");

   const handelSignUp = (e) => {
      e.preventDefault();
      setErr("");
      setSuccess("");
      const email = e.target.email.value;
      const newPassword = e.target.newPassword.value;
      const confirmPassword = e.target.confirmPassword.value;
      console.log(email, newPassword, confirmPassword);
      if (newPassword !== confirmPassword) {
         setErr("Password Does Not Match With Confirm Password");
         return;
      } else if (newPassword.length < 8) {
         setErr("Your password should be at least 8 characters");
         return;
      } else if (!/^(?=.*[A-Za-z]).+$/.test(newPassword)) {
         setErr("Your password should contain at least one character");
         return;
      }
      emailPassSingUp(email, newPassword)
         .then((userCredential) => {
            // Signed in
            const user = userCredential.user;

            console.log(user);
            setSuccess("User Created Successfully");
         })
         .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErr(errorMessage);
         });
   };

   return (
      <div className="user-container">
         <h2 className="page-title">Sign Up</h2>
         <Form onSubmit={handelSignUp}>
            <div className="from-control">
               <label htmlFor="log-email">Email</label>
               <input type="email" name="email" id="log-email" placeholder="Email" required />
            </div>
            <div className="from-control">
               <label htmlFor="newPassword">New Password</label>
               <input
                  type={passShow ? "text" : "password"}
                  name="newPassword"
                  id="new-password"
                  placeholder="New Password"
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
            <div className="from-control">
               <label htmlFor="confirmPassword">Confirm Password</label>
               <input
                  type={passShow ? "text" : "password"}
                  name="confirmPassword"
                  id="confirm-password"
                  placeholder="Confirm Password"
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
               Sign Up
            </button>
         </Form>
         <p className="page-link">
            Already Have An Account?{" "}
            <Link to="/signup" className="link">
               Login!{" "}
            </Link>
         </p>
         <p className="btm-line">
            <span>or</span>
         </p>
         <button className="btn-google">
            <img src={google} alt="" />
            <p>Continue With Google</p>
         </button>
         <p className="err-text">{err}</p>
         <p className="success-text">{success}</p>
      </div>
   );
};

export default SignUp;
