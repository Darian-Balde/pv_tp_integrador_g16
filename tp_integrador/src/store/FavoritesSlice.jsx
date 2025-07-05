import { createSlice } from "@reduxjs/toolkit";

// Leer favoritos de localStorage al iniciar
const loadFavorites = () => {
  try {
    const data = localStorage.getItem("favorites");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    items: loadFavorites(),
  },
  reducers: {
    toggleFavorite(state, action) {
      const productId = action.payload.id;
      const exists = state.items.find((item) => item.id === productId);
      if (exists) {
        state.items = state.items.filter((item) => item.id !== productId);
      } else {
        state.items.push(action.payload);
      }
      // Guardar en localStorage cada vez que cambia
      localStorage.setItem("favorites", JSON.stringify(state.items));
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
