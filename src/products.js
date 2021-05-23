import axios from "axios";
import { useCallback, useEffect, useReducer, useState } from "react";
import {
  productsReducer,
  getSortedData,
  getFilteredData,
} from "./products.reducer";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [{ showInventoryAll, showFastDeliveryOnly, sortBy }, dispatch] =
    useReducer(productsReducer, {
      showInventoryAll: true,
      showFastDeliveryOnly: false,
      sortBy: null,
    });

  useEffect(() => {
    (async function () {
      const { data } = await axios.get("/api/products");
      //   console.log("console...", data);
      setProducts(data.products);
    })();
  }, []);

  const sortedData = getSortedData(products, sortBy);
  const filteredData = getFilteredData(sortedData, {
    showInventoryAll,
    showFastDeliveryOnly,
  });

  return (
    <div className="container-center">
      <div className="sortByPrice">
        <fieldset>
          <legend>Sort by</legend>
          <div>
            <input
              type="radio"
              name="sort"
              onChange={() =>
                dispatch({ type: "SORT", value: "PRICE_LOW_TO_HIGH" })
              }
              checked={sortBy && sortBy === "PRICE_LOW_TO_HIGH"}
            />
            <label>Price- Low to High</label>
          </div>
          <div>
            <input
              type="radio"
              name="sort"
              onChange={() =>
                dispatch({ type: "SORT", value: "PRICE_HIGH_TO_LOW" })
              }
              checked={sortBy && sortBy === "PRICE_HIGH_TO_LOW"}
            />
            <label>Price- High to Low</label>
          </div>
        </fieldset>
      </div>

      <div>
        <fieldset>
          <legend>Filters</legend>
          <div>
            <input
              type="checkbox"
              name="sort"
              onChange={() => dispatch({ type: "TOGGLE_INVENTORY" })}
              checked={showInventoryAll}
            />
            <label>Include out of Stock</label>
          </div>
          <div>
            <input
              type="checkbox"
              name="sort"
              onChange={() => dispatch({ type: "TOGGLE_DELIVERY" })}
              checked={showFastDeliveryOnly}
            />
            <label>Fast delivery Only</label>
          </div>
        </fieldset>
      </div>

      <h1>Product List</h1>
      <div className="card-parent">
        {filteredData.map((item) => (
          <div className="card">
            <img className="card-img" src={item.image} alt={item.id} />
            <div>{item.name}</div>
            <div>Rs. {item.price}</div>
            <button className="card-cart-btn">Add to Cart</button>
            <button className="card-wishlist-btn">
              <i className="fas fa-heart"></i>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
