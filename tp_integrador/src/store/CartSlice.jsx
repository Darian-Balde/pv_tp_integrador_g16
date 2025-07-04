import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
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
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
    clearLastAdded: (state) => {
      state.lastAdded = null;
    },
  },
});

export const { addToCart, removeFromCart, clearCart, clearLastAdded } = cartSlice.actions;
export default cartSlice.reducer;
