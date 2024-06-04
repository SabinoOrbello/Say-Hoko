import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const listOrders = createAsyncThunk("order/listOrders", async (_, thunkAPI) => {
  try {
    const response = await axios.get("https://say-hoko12.azurewebsites.net/api/ordini");
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const getOrderSlice = createSlice({
  name: "orders",
  initialState: { orders: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(listOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(listOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default getOrderSlice.reducer;
