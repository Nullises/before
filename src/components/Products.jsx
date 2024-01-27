import React, { useState } from "react";
import "../App.css";
import Spinner from "../Spinner";
import useFetch from "../services/useFetch";
import { useParams } from "react-router-dom";
import PageNotFound from "./PageNotFound";
import { Link } from "react-router-dom";

export default function Products() {
  const [size, setSize] = useState("");
  // category is destructured
  const { category } = useParams();
  // data is using an alias (:)
  const {
    data: products,
    loading,
    error,
  } = useFetch(`products?category=${category}`);

  function renderProduct(p) {
    return (
      <div key={p.id} className="product">
        <Link to={`/${category}/${p.id}`}>
          <img src={`/images/${p.image}`} alt={p.name} />
          <h3>{p.name}</h3>
          <p>${p.price}</p>
        </Link>
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

  if (loading) return <Spinner />;

  if (products.length === 0) return <PageNotFound />;

  return (
    <>
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
        <section id="products">{filteredProducts.map(renderProduct)}</section>
      </section>
    </>
  );
}
