import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const updateOrderStatus = createAsyncThunk("orderUpdate/updateOrderStatus", async ({ orderId, newState }) => {
  const response = await axios.put(
    `https://say-hoko12.azurewebsites.net/api/ordini/${orderId}`,
    {
      stato: newState,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
});

const orderUpdateSlice = createSlice({
  name: "orderUpdate",
  initialState: {
    status: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateOrderStatus.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateOrderStatus.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default orderUpdateSlice.reducer;
