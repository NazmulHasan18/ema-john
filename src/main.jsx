import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import Header from "./component/Header/Header";
import Products from "./component/Products/Products";
import Order_review from "./component/Order-review/Order-review";
import Manage_inventory from "./component/Manage-inventory/Manage_inventory";
import Login from "./component/Login/Login";
import loadSavedCart from "./LoadSavedCart";

const router = createBrowserRouter([
   {
      path: "/",
      element: <App></App>,
      children: [
         {
            path: "/",
            element: <Products></Products>,
         },

         {
            path: "/order-review",
            element: <Order_review></Order_review>,
            loader: loadSavedCart,
         },
         {
            path: "/manage-inventory",
            element: <Manage_inventory></Manage_inventory>,
         },
         {
            path: "/login",
            element: <Login></Login>,
         },
      ],
   },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
   <React.StrictMode>
      <RouterProvider router={router} />
   </React.StrictMode>
);
