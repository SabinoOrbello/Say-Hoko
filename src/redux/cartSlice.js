import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const existingIndex = state.cartItems.findIndex((item) => item.prodottoId === action.payload.prodottoId);

      if (existingIndex >= 0) {
        state.cartItems[existingIndex].quantita += 1;
      } else {
        const newItem = { ...action.payload, quantita: 1 };
        state.cartItems.push(newItem);
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((item) => item.prodottoId !== action.payload.prodottoId);
    },
    updateQuantity: (state, action) => {
      const { prodottoId, quantita } = action.payload;
      const existingItem = state.cartItems.find((item) => item.prodottoId === prodottoId);
      if (existingItem && quantita > 0) {
        existingItem.quantita = quantita;
      } else if (existingItem && quantita === 0) {
        state.cartItems = state.cartItems.filter((item) => item.prodottoId !== prodottoId);
      }
    },
    resetCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, resetCart } = cartSlice.actions;

export default cartSlice.reducer;
