import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchProducts } from "./ProductsSlice";

import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import Favoritos from "./pages/Favoritos";  
import CrearProducto from "./pages/CrearProducto"; 
import EditarProducto from "./pages/EditarProducto";
import DetalleProducto from "./pages/DetalleProductos";
import Register from "./pages/Register";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute"; // ✅ Importado

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <div style={{ marginTop: "80px" }}>
                <ProductList />
              </div>
            </PrivateRoute>
          }
        />
        <Route
          path="/favoritos"
          element={
            <PrivateRoute>
              <Favoritos />
            </PrivateRoute>
          }
        />
        <Route
          path="/crear"
          element={
            <PrivateRoute>
              <CrearProducto />
            </PrivateRoute>
          }
        />
        <Route
          path="/editar/:id"
          element={
            <PrivateRoute>
              <EditarProducto />
            </PrivateRoute>
          }
        />
        <Route
          path="/detalle/:id"
          element={
            <PrivateRoute>
              <DetalleProducto />
            </PrivateRoute>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default App;
