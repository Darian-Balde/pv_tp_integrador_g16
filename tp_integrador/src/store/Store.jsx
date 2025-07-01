import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./ProductsSlice";
import favoritesReducer from "./FavoritesSlice";
import userReducer from "./userSlice"; // ✅ Importamos el nuevo slice

const Store = configureStore({
  reducer: {
    products: productsReducer,
    favorites: favoritesReducer,
    user: userReducer, // ✅ Lo agregamos al store
  },
});

export default Store;
