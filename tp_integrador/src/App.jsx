import React, { useEffect } from "react";
import ProductList from "./components/ProductList";
import { useDispatch } from "react-redux";
import { fetchProducts } from "./ProductsSlice";
import "./styles/ProductList.css"; 

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

 return (
    <div className="page-wrapper">
      <h1 className="main-title">Lista de Productos</h1>
      <ProductList />
    </div>
  );
};

export default App;
