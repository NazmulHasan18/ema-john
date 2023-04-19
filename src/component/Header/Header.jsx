import React, { useContext, useState } from "react";
import logo from "../../images/Logo.svg";
import "./Header.css";
import { Link, NavLink } from "react-router-dom";
import { authContext } from "../Provider/AuthProvider";
const Header = () => {
   const { user, logOut } = useContext(authContext);
   const [err, setErr] = useState("");
   const [success, setSuccess] = useState("");
   const handelLogOut = () => {
      setErr("");
      setSuccess("");
      logOut()
         .then(() => {
            setSuccess("logged out successfully");
         })
         .catch((error) => {
            setErr(error.message);
         });
   };

   return (
      <nav className="header">
         <img src={logo} alt="" />

         <div className="anchor-container">
            <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
               Order
            </NavLink>
            <NavLink to="/order-review" className={({ isActive }) => (isActive ? "active" : "")}>
               Order Review
            </NavLink>
            <NavLink to="/manage-inventory" className={({ isActive }) => (isActive ? "active" : "")}>
               Manage Inventory
            </NavLink>
            {!user ? (
               <>
                  {" "}
                  <NavLink to="/login" className={({ isActive }) => (isActive ? "active" : "")}>
                     Login
                  </NavLink>
                  <NavLink to="/signup" className={({ isActive }) => (isActive ? "active" : "")}>
                     Sign Up
                  </NavLink>
               </>
            ) : (
               <Link onClick={handelLogOut}>Log Out</Link>
            )}
         </div>
      </nav>
   );
};

export default Header;
