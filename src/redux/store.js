// store.js
import { configureStore } from "@reduxjs/toolkit";
import prodottiReducer from "./productSlice.js";
import registrationReducer from "./registrationSlice.js";
import creaProdottoReducer from "./postProductSlice.js";
import cartReducer from "./cartSlice.js";
import orderSlice from "./orderSlice";
import orderReducer from "./getOrderSlice.js";
import putProductReducer from "./putProductSlice.js";
import userReducer from "./getUser.js";
import orderGetReducer from "./orderGetSlice.js";
import orderUpdateReducer from "./orderUpdateSlice";
import productSalesReducer from "./productSalesSlice";

const store = configureStore({
  reducer: {
    prodotti: prodottiReducer,
    registration: registrationReducer,
    creaProdotto: creaProdottoReducer,
    cart: cartReducer,
    order: orderSlice,
    getOrder: orderReducer,
    product: putProductReducer,
    users: userReducer,
    orderGet: orderGetReducer,
    orderUpdate: orderUpdateReducer,
    productSales: productSalesReducer,
  },
});

export default store;
