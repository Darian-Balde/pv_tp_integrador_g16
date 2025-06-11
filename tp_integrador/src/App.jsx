import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchProducts } from "./ProductsSlice";

import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import Favoritos from "./pages/Favoritos";  // ← Asegurate de que exista
import CrearProducto from "./pages/CrearProducto";  // ← Asegurate de que exista

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
   <>
  <Navbar />
  <Routes>
    <Route path="/" element={
      <div style={{ marginTop: "80px" }}>
        <h1>Lista de Productos</h1>
        <ProductList />
      </div>
    } />
    <Route path="/favoritos" element={<Favoritos />} />
    <Route path="/crear" element={<CrearProducto />} />
  </Routes>
</>
  );
};

export default App;
