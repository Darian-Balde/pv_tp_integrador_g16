import React, { useEffect } from "react";
import ProductList from "./components/ProductList";
import { useDispatch } from "react-redux";
import { fetchProducts } from "./ProductsSlice";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div>
      <h1>Lista de Productos</h1>
      <ProductList />
    </div>
  );
};

export default App;
