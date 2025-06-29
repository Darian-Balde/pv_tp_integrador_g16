import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchProducts } from "./ProductsSlice";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import Favoritos from "./pages/Favoritos";
import CrearProducto from "./pages/CrearProducto";
import EditarProducto from "./pages/EditarProducto";
import DetalleProducto from "./pages/DetalleProductos";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />
      <main style={{ flex: 1, paddingTop: "80px" }}>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/favoritos" element={<Favoritos />} />
          <Route path="/crear" element={<CrearProducto />} />
          <Route path="/editar/:id" element={<EditarProducto />} />
          <Route path="/detalle/:id" element={<DetalleProducto />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;