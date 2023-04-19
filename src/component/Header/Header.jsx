import React, { useContext } from "react";
import logo from "../../images/Logo.svg";
import "./Header.css";
import { NavLink } from "react-router-dom";
import { authContext } from "../Provider/AuthProvider";
const Header = () => {
   const { user } = useContext(authContext);

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
            <NavLink to="/login" className={({ isActive }) => (isActive ? "active" : "")}>
               Login
            </NavLink>
            <NavLink to="/signup" className={({ isActive }) => (isActive ? "active" : "")}>
               Sign Up
            </NavLink>
            <p>{user?.email}</p>
         </div>
      </nav>
   );
};

export default Header;
