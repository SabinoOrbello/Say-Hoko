// slice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProdotti = createAsyncThunk("prodotti/fetchProdotti", async () => {
  const response = await fetch("https://say-hoko12.azurewebsites.net/api/Prodotti");
  return response.json();
});

const prodottiSlice = createSlice({
  name: "prodotti",
  initialState: {
    list: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProdotti.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProdotti.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchProdotti.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default prodottiSlice.reducer;
