import { getShoppingCart } from "./utilities/fakedb";

const loadSavedCart = async () => {
   const res = await fetch("products.json");
   const products = await res.json();

   //    console.log(products);
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

   return storedCart;
};

export default loadSavedCart;
