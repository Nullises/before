import React, { useState } from "react";
import useFetch from "../services/useFetch";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../Spinner";
import PageNotFound from "./PageNotFound";

export default function Detail(props) {
  const [sku, setSku] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: product, loading, error } = useFetch(`products/${id}`);

  if (loading) return <Spinner />;
  if (!product) return <PageNotFound />;
  if (error) {
    return (
      <>
        <PageNotFound />
      </>
    );
  }

  return (
    <div id="detail">
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p id="price">${product.price}</p>
      <select id="size" value={sku} onChange={(e) => setSku(e.target.value)}>
        <option value="">What size?</option>
        {product.skus.map((sku) => (
          <option key={sku.sku} value={sku.sku}>
            {sku.size}
          </option>
        ))}
      </select>
      <p>
        <button
          disabled={!sku}
          onClick={() => {
            props.addToCart(id, sku);
            navigate("/cart");
          }}
          className="btn btn-primary"
        >
          Add to cart
        </button>
      </p>

      <img src={`/images/${product.image}`} alt={product.category} />
    </div>
  );
}
