import React, { useState, useEffect } from "react";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import { getProducts } from "./services/productService";

export default function App() {
  const [size, setSize] = useState("");
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsAsync = await getProducts("shoes");
        setProducts(productsAsync);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, []);

  function renderProduct(p) {
    return (
      <div key={p.id} className="product">
        <a href="/">
          <img src={`/images/${p.image}`} alt={p.name} />
          <h3>{p.name}</h3>
          <p>${p.price}</p>
        </a>
      </div>
    );
  }

  const filteredProducts = size
    ? products.filter((product) =>
        product.skus.find((sku) => sku.size === parseInt(size))
      )
    : products;

  if (error) {
    return (
      <>
        <h1>Something get wrong!</h1>
      </>
    );
  }

  return (
    <>
      <div className="content">
        <Header />
        <main>
          <section id="filters">
            <label htmlFor="size">Filter by Size:</label>{" "}
            <select
              id="size"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            >
              <option value="">All sizes</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
            </select>
            {size && <h2>Found: {filteredProducts.length} items</h2>}
            <section id="products">
              {filteredProducts.map(renderProduct)}
            </section>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
}
