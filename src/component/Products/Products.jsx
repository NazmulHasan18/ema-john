import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Product from "../Product/Product";
import "./Products.css";

const Products = () => {
   const [products, setProducts] = useState([]);
   useEffect(() => {
      fetch("products.json")
         .then((res) => res.json())
         .then((data) => setProducts(data));
   }, []);
   return (
      <div className="shop-container">
         <div className="product-container">
            {products.map((product) => (
               <Product product={product} key={product.id}></Product>
            ))}
         </div>
         <div>
            <h2>Order Summery</h2>
         </div>
      </div>
   );
};

export default Products;
