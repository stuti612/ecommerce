import { useState } from "react";
import Products from "./products";
import Wishlist from "./wishlist";
import Cart from "./cart";
import "./styles.css";

export default function App() {
  const [route, setRoute] = useState("products");
  return (
    <div className="App">
      <button onClick={() => setRoute("products")}>Products</button>
      <button onClick={() => setRoute("cart")}>Cart</button>
      <button onClick={() => setRoute("wishlist")}>wishlist</button>
      <h1>Ecommerce App</h1>
      {route === "products" && <Products />}
      {route === "cart" && <Cart />}
      {route === "wishlist" && <Wishlist />}
    </div>
  );
}
