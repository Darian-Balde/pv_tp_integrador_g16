import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./ProductsSlice";
import favoritesReducer from "./FavoritesSlice";
import userReducer from "./userSlice";
import cartReducer from "./CartSlice"; // Importamos el reducer del carrito

const Store = configureStore({
  reducer: {
    products: productsReducer,
    favorites: favoritesReducer,
    user: userReducer,
    cart: cartReducer, // Agregamos el reducer del carrito al store
  },
});

export default Store;
