import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const creaProdotto = createAsyncThunk("prodotti/creaProdotto", async (prodotto) => {
  const response = await fetch("https://say-hoko12.azurewebsites.net/api/Prodotti", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(prodotto),
  });
  return response.json();
});

const initialState = {
  prodotti: [],
  status: "idle", // 'idle', 'loading', 'succeeded', 'failed'
  error: null,
};

const creaProdottoSlice = createSlice({
  name: "prodotti",
  initialState,
  reducers: {
    // eventuali reducers sincroni
  },
  extraReducers: (builder) => {
    builder
      .addCase(creaProdotto.pending, (state) => {
        state.status = "loading";
      })
      .addCase(creaProdotto.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.prodotti.push(action.payload);
      })
      .addCase(creaProdotto.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default creaProdottoSlice.reducer;
