// features/order/orderSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Definire l'azione asincrona con createAsyncThunk
export const createOrder = createAsyncThunk("order/createOrder", async (orderData, thunkAPI) => {
  try {
    const response = await axios.post("https://say-hoko12.azurewebsites.net/api/ordini", orderData);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const orderSlice = createSlice({
  name: "order",
  initialState: {
    order: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.order = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;
