import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./ProductsSlice";
import favoritesReducer from "./FavoritesSlice";

const Store = configureStore({
  reducer: {
    products: productsReducer,
    favorites: favoritesReducer,
  },
});

export default Store;
