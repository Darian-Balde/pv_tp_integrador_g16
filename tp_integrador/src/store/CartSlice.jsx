import { createSlice } from "@reduxjs/toolkit";

// Leer carrito de localStorage al iniciar
const loadCart = () => {
  try {
    const data = localStorage.getItem("cart");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const initialState = {
  items: loadCart(),
  lastAdded: null, // <-- nuevo estado
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const exists = state.items.find((i) => i.id === item.id);
      if (exists) {
        exists.qty = (exists.qty || 1) + 1;
      } else {
        state.items.push({ ...item, qty: 1 });
      }
      state.lastAdded = item; // <-- guarda el último producto agregado
      // Guardar en localStorage cada vez que cambia
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
      // Guardar en localStorage cada vez que cambia
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    updateQuantity: (state, action) => {
      const { id, qty } = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (item) {
        if (qty <= 0) {
          // Si la cantidad es 0 o menor, remover el item
          state.items = state.items.filter((i) => i.id !== id);
        } else {
          item.qty = qty;
        }
        // Guardar en localStorage cada vez que cambia
        localStorage.setItem("cart", JSON.stringify(state.items));
      }
    },
    clearCart: (state) => {
      state.items = [];
      // Limpiar localStorage
      localStorage.setItem("cart", JSON.stringify([]));
    },
    clearLastAdded: (state) => {
      state.lastAdded = null;
    },
    // Nuevo reducer para sincronizar desde localStorage
    syncCartFromStorage: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, clearLastAdded, syncCartFromStorage } = cartSlice.actions;
export default cartSlice.reducer;
