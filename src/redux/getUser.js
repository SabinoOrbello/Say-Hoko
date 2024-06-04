import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch users
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axios.get("https://localhost:7052/api/Utenti");
  return response.data;
});

// Update user role
export const updateUserRole = createAsyncThunk("users/updateUserRole", async ({ userId, newRole }, { getState }) => {
  const state = getState();
  const existingUser = state.users.list.find((user) => user.userId === userId);

  if (existingUser) {
    const updatedUser = { ...existingUser, role: newRole };

    await axios.put(`https://say-hoko12.azurewebsites.net/api/Utenti/${userId}`, updatedUser, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return updatedUser;
  }
});

const userSlice = createSlice({
  name: "users",
  initialState: {
    list: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateUserRole.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserRole.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Aggiorna il ruolo dell'utente nella lista
        const updatedUser = action.payload;
        state.list = state.list.map((user) => (user.userId === updatedUser.userId ? updatedUser : user));
      })
      .addCase(updateUserRole.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
