import React from "react";
import "./Product.css";

const Product = (props) => {
   const { img, name, seller, price, ratings, stock } = props.product;
   const handelCart = props.handelCart;
   // console.log(props.product);
   return (
      <div className="product">
         <img src={img} alt="" />
         <div className="product-info">
            <h3>{name}</h3>
            <h4>Price: ${price}</h4>
            <p>Manufacturer: {seller}</p>

            <p>Ratings: {ratings} Star</p>
            <p>In Stock: {stock}</p>
         </div>
         <button className="btn-add-cart" onClick={() => handelCart(props.product)}>
            Add To Cart
         </button>
      </div>
   );
};

export default Product;
