import { createSlice } from "@reduxjs/toolkit";

// Recuperar usuario desde localStorage (si existe)
const getSessionUser = () => {
  const stored = localStorage.getItem("sessionUser");
  return stored ? JSON.parse(stored) : null;
};

const initialState = {
  user: getSessionUser(),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload;
    },
    logoutUser: (state) => {
      state.user = null;
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
