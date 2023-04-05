import React, { useEffect, useState } from "react";
import { deleteShoppingCart } from "../../utilities/fakedb";

import "./Cart.css";

const Cart = ({ cart, handelClear }) => {
   //    const { price, shipping } = cart;
   //    console.log(cart);
   //    let [item, setItem] = useState(0);
   let item = 0;
   let totalPrice = 0;
   let totalShipping = 0;
   for (const product of cart) {
      const { price, shipping, quantity } = product;
      totalPrice += price * quantity;
      totalShipping += shipping * quantity;
      item += quantity;
   }
   let tax = (totalPrice * 7) / 100;
   //    setItem(item2);
   //    useEffect(,[])
   return (
      <div className="cart-container">
         <h2>Order Summery</h2>
         <div>
            <p>Selected Item: {item}</p>
            <p>Total Price: {totalPrice}</p>
            <p>Shipping Charge: {totalShipping}</p>
            <p>Tax: {tax.toFixed(2)}</p>
            <h4>Grand Total: {(totalPrice + totalShipping + tax).toFixed(2)}</h4>
         </div>
         <button
            onClick={() => {
               deleteShoppingCart();
               handelClear();
               //    window.location.reload();
               //    setItem(0);
            }}
            className="btn-clear"
         >
            Clear Cart
         </button>
      </div>
   );
};

export default Cart;
