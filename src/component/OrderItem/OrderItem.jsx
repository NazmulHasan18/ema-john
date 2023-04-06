import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

import "./OrderItem.css";
import { removeFromDb } from "../../utilities/fakedb";

const OrderItem = ({ product, handelReviewDelete }) => {
   const { name, id, quantity, price, img } = product;
   return (
      <div className="order-item">
         <img src={img} alt="" />
         <div className="order-details">
            <h4>{name}</h4>
            <p>
               Price: <span>${price}</span>
            </p>
            <p>
               Quantity: <span>{quantity}</span>
            </p>
         </div>
         <button className="btn-delete" onClick={() => handelReviewDelete(id)}>
            <FontAwesomeIcon icon={faTrashCan} />
         </button>
      </div>
   );
};

export default OrderItem;
