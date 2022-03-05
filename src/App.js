import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles.css";

export default function App() {
  const [loader, setLoader] = useState(false);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        setLoader(true);

        const response = await axios.get("./api/products");
        setProducts(response.data.products);
      } catch (error) {
        setLoader("ERROR");
        console.log("ERROR");
      } finally {
        setLoader(false);
      }
    })();
  }, []);

  return (
    <div className="App">
      <h1> Showcase Products </h1>
      {loader && <div>...loading</div>}
      {products.map((product) => {
        return (
          <li className="card" key={product.id}>
            {<img src={product.image} alt={product.name} />}
            {<div className="card-heading">{product.name}</div>}
          </li>
        );
      })}
    </div>
  );
}
