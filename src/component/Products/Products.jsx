import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { addToDb, getShoppingCart } from "../../utilities/fakedb";
import Cart from "../Cart/Cart";
import Product from "../Product/Product";
import "./Products.css";

const Products = () => {
   const [products, setProducts] = useState([]);
   useEffect(() => {
      fetch("products.json")
         .then((res) => res.json())
         .then((data) => setProducts(data));
   }, []);
   const [cart, setCart] = useState([]);

   const handelCart = (product) => {
      const exist = cart.find((pd) => pd.id === product.id);
      const remaining = cart.filter((pd) => pd.id !== product.id);
      let newCart = [];
      if (!exist) {
         product.quantity = 1;
         newCart = [...cart, product];
      } else {
         exist.quantity += 1;
         newCart = [...remaining, exist];
      }
      setCart(newCart);
      addToDb(product.id);
   };
   useEffect(() => {
      // console.log(cart);
   }, [cart]);
   useEffect(() => {
      const getStoredCart = getShoppingCart();
      //    console.log(storedCart);
      const storedCart = [];
      for (const id in getStoredCart) {
         const product = products.find((pd) => pd.id === id);
         if (product) {
            product.quantity = getStoredCart[id];
            storedCart.push(product);
         }
      }
      setCart(storedCart);
   }, [products]);
   const handelClear = () => {
      setCart([]);
   };

   return (
      <div className="shop-container">
         <div className="product-container">
            {products.map((product) => (
               <Product product={product} key={product.id} handelCart={handelCart}></Product>
            ))}
         </div>
         <div>
            <Cart cart={cart} handelClear={handelClear}></Cart>
         </div>
      </div>
   );
};

export default Products;
