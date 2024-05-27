import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { updateProduct, fetchProductById } from "../api/productApi";

export const updateProductAsync = createAsyncThunk("product/updateProduct", async (product) => {
  const response = await updateProduct(product);
  return response.data;
});

export const fetchProductByIdAsync = createAsyncThunk("product/fetchProductById", async (id) => {
  const response = await fetchProductById(id);
  return response.data;
});

const putProductSlice = createSlice({
  name: "product",
  initialState: {
    product: {},
    status: "idle",
    error: null,
  },
  reducers: {
    clearProduct: (state) => {
      state.product = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.product = action.payload;
      })
      .addCase(updateProductAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchProductByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.product = action.payload;
      })
      .addCase(fetchProductByIdAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { clearProduct } = putProductSlice.actions;

export const selectProduct = (state) => state.product.product;

export default putProductSlice.reducer;
