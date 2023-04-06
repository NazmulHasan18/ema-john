import React, { useState } from "react";
import Cart from "../Cart/Cart";
import { useLoaderData } from "react-router-dom";
import OrderItem from "../OrderItem/OrderItem";
import "./Order-review.css";
import { getShoppingCart, removeFromDb } from "../../utilities/fakedb";

const Order_review = () => {
   const savedCart = useLoaderData();
   //    console.log(savedCart);
   const [cart, setCart] = useState(savedCart);
   const handelClear = () => {
      setCart([]);
   };
   const handelReviewDelete = (id) => {
      const remainingCart = cart.filter((pd) => id !== pd.id);
      setCart(remainingCart);
      removeFromDb(id);
   };

   return (
      <div className="order">
         <div className="order-container">
            {cart.map((product) => (
               <OrderItem
                  key={product.id}
                  product={product}
                  handelReviewDelete={handelReviewDelete}
               ></OrderItem>
            ))}
         </div>
         <div className="review-cart-container">
            <Cart cart={cart} handelClear={handelClear}></Cart>
         </div>
      </div>
   );
};

export default Order_review;
