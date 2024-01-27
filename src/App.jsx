import React from "react";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import Products from "./components/Products";
import Cart from "./components/Cart";
import Detail from "./components/Detail";
import { Route, Routes } from "react-router-dom";

export default function App() {
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
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="/:category/:id" element={<Detail />}></Route>
          </Routes>
        </main>
      </div>
      <Footer />
    </>
  );
}
