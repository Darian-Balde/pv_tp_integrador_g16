import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./ProductsSlice";

const Store = configureStore({
  reducer: {
    products: productsReducer,
  },
});

export default Store;
