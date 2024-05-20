// store.js
import { configureStore } from "@reduxjs/toolkit";
import prodottiReducer from "./productSlice.js";
import registrationReducer from "./registrationSlice.js";
import creaProdottoReducer from "./postProductSlice.js";
import cartReducer from "./cartSlice.js";
import orderSlice from "./orderSlice";

const store = configureStore({
  reducer: {
    prodotti: prodottiReducer,
    registration: registrationReducer,
    creaProdotto: creaProdottoReducer,
    cart: cartReducer,
    order: orderSlice,
  },
});

export default store;
