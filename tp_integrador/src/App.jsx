/**Modifique el app.jsx para agregar el boton de favorito e intercalar entre favorito y los demas productos  */

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchProducts } from "./ProductsSlice";
import ProductList from "./components/ProductList";
import FavoritesList from "./components/FavoriteList";
import "./styles/ProductList.css";

const App = () => {
  const dispatch = useDispatch();
  const [view, setView] = useState("products");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="page-wrapper">
      <h1 className="main-title">Lista de Productos</h1>
      <div className="tab-buttons">
        <button onClick={() => setView("products")}>Productos</button>
        <button onClick={() => setView("favorites")}>Favoritos ❤️</button>
      </div>
      {view === "products" ? <ProductList /> : <FavoritesList />}
    </div>
  );
};

export default App;

