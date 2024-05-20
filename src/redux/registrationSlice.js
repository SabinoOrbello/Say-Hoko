// features/registration/registrationSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const registerUser = createAsyncThunk("registration/registerUser", async (userData, thunkAPI) => {
  const response = await fetch("https://localhost:7052/api/Utenti", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (response.ok) {
    const user = await response.json();
    return user;
  } else {
    const error = await response.json();
    return thunkAPI.rejectWithValue(error);
  }
});

const registrationSlice = createSlice({
  name: "registration",
  initialState: { user: null, error: null, status: "idle" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default registrationSlice.reducer;
