import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  const response = await fetch("https://fakestoreapi.com/products");
  const products = await response.json();
  return products;
});

const productsSlice = createSlice({
  name: "products",
  initialState: {
    entities: [],
    loading: false,
    error: null
  },
  reducers: {
    add(state, action) {
      state.entities.push(action.payload);
    },
    update(state, action) {
      const index = state.entities.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.entities[index] = action.payload;
      }
    },
    remove(state, action) {
      state.entities = state.entities.filter(p => p.id !== action.payload);
   }
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.entities = action.payload;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const { add, update , remove} = productsSlice.actions;
export default productsSlice.reducer;