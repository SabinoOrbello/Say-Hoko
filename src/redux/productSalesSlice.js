// src/redux/productSalesSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProductSales = createAsyncThunk("productSales/fetchProductSales", async () => {
  const response = await axios.get("https://say-hoko12.azurewebsites.net/api/dettagliordine/product-sales");
  return response.data;
});

const productSalesSlice = createSlice({
  name: "productSales",
  initialState: {
    sales: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductSales.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductSales.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.sales = action.payload;
      })
      .addCase(fetchProductSales.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default productSalesSlice.reducer;
