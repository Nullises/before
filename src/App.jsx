import React, { useEffect, useState } from "react";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import Products from "./components/Products";
import Cart from "./components/Cart";
import Detail from "./components/Detail";
import { Route, Routes } from "react-router-dom";
import Checkout from "./components/Checkout";

export default function App() {
  const [cart, setCart] = useState(() => {
    try {
      return localStorage.getItem(JSON.parse("cart")) ?? [];
    } catch (error) {
      console.error("JSON can't be parsed");
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  function addToCart(id, sku) {
    setCart((items) => {
      const itemInCart = items.find((i) => i.sku === sku);
      if (itemInCart) {
        return items.map((i) =>
          i.sku === sku ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [...items, { id, sku, quantity: 1 }];
      }
    });
  }

  function updateQuantity(sku, quantity) {
    setCart((items) => {
      return quantity === 0
        ? items.filter((i) => i.sku !== sku)
        : items.map((i) => (i.sku === sku ? { ...i, quantity } : i));
    });
  }

  function emptyCart() {
    setCart([]);
  }

  return (
    <>
      <div className="content">
        <Header />
        <main>
          <Routes>
            <Route
              path="/"
              exact
              element={
                <>
                  <h1>Welcome to Carved Rock Fitness</h1>
                </>
              }
            ></Route>
            <Route path="/:category" element={<Products />}></Route>
            <Route
              path="/cart"
              element={<Cart cart={cart} updateQuantity={updateQuantity} />}
            ></Route>
            <Route
              path="/:category/:id"
              element={<Detail addToCart={addToCart} />}
            ></Route>
            <Route
              path="/checkout"
              element={<Checkout cart={cart} emptyCart={emptyCart} />}
            ></Route>
          </Routes>
        </main>
      </div>
      <Footer />
    </>
  );
}
