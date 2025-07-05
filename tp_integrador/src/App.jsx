import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchProducts } from "./store/ProductsSlice";
import { useStorageSync } from "./hooks/useStorageSync"; // Importar el hook de sincronización

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";

import ProductList from "./components/ProductList";
import Favoritos from "./pages/Favoritos";  
import CrearProducto from "./pages/CrearProducto"; 
import EditarProducto from "./pages/EditarProducto";
import DetalleProducto from "./pages/DetalleProductos";
import Register from "./pages/Register";
import Login from "./pages/Login";
import GlobalAlert from "./components/GlobalAlert"; // Paso 4: importar el alert global
import Carrito from "./pages/Carrito";

const App = () => {
  const dispatch = useDispatch();
  
  // Hook para sincronizar favoritos entre pestañas
  useStorageSync();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <GlobalAlert /> {/* Paso 4: mostrar el alert global */}
      <Navbar />
      <main style={{ flex: 1, paddingTop: "70px" }}>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <ProductList />
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
          <Route
            path="/carrito"
            element={
              <PrivateRoute>
                <Carrito />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
    
  );
};

export default App;

