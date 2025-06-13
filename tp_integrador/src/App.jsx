import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchProducts } from "./ProductsSlice";

import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import Favoritos from "./pages/Favoritos";  
import CrearProducto from "./pages/CrearProducto"; 
import EditarProducto from "./pages/EditarProducto";
import FavoriteList from "./components/FavoriteList";
import DetalleProducto from "./pages/DetalleProductos";

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
        {/*<h1>Lista de Productos</h1>*/}
        <ProductList />
      </div>
    } />
    <Route path="/" element={<ProductList />} />
    <Route path="/favoritos" element={<Favoritos />} />
    <Route path="/crear" element={<CrearProducto />} />
    <Route path="/editar/:id" element={<EditarProducto />} />
    <Route path="/detalle/:id" element={<DetalleProducto />} />
  </Routes>
</>
  );
};

export default App;