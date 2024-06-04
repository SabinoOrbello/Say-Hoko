import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch orders
export const fetchOrders = createAsyncThunk("orderGet/fetchOrders", async () => {
  const response = await axios.get("https://say-hoko12.azurewebsites.net/api/ordini");
  return response.data;
});

// Update order status
export const updateOrderStatus = createAsyncThunk(
  "orderGet/updateOrderStatus",
  async ({ orderId, newState }, { getState }) => {
    const state = getState();
    const existingOrder = state.orderGet.list.find((order) => order.ordiniId === orderId);

    if (existingOrder) {
      const updatedOrder = { ...existingOrder, stato: newState };

      await axios.put(`https://localhost:7052/api/ordini/${orderId}`, updatedOrder, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return updatedOrder;
    }
  }
);

const orderGetSlice = createSlice({
  name: "orderGet",
  initialState: {
    list: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const updatedOrder = action.payload;
        const existingOrderIndex = state.list.findIndex((order) => order.ordiniId === updatedOrder.ordiniId);

        if (existingOrderIndex >= 0) {
          state.list[existingOrderIndex] = updatedOrder;
        }
      });
  },
});

export default orderGetSlice.reducer;
