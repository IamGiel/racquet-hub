import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { loginApi } from "../apis/fetch";

interface UserAuthState {
  isAuthenticated: boolean;
  // Add more authentication-related state here if needed
}

const initialState: UserAuthState = {
  isAuthenticated: false,
  // Initialize additional state if needed
};

// Define the type for the credentials argument
interface Credentials {
  username: string;
  password: string;
}
// Create an async thunk to handle the login process
export const getSession = createAsyncThunk(
  "userAuth/getSession",
  async (credentials: Credentials, { rejectWithValue }) => {
    try {
      // Call the login API with the provided credentials
      const response = await loginApi(credentials);
      return response.data;
    } catch (error: any) {
      console.error("Failed to fetch session:", error);
      // Return the error message as the payload
      return rejectWithValue(error?.message);
    }
  }
);

const userAuthSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    login(state) {
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
      // Reset any additional state if needed
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getSession.pending, (state) => {
        // Handle pending state
      })
      .addCase(getSession.fulfilled, (state, action) => {
        // Handle fulfilled state
        state.isAuthenticated = true;
      })
      .addCase(getSession.rejected, (state, action) => {
        // Handle rejected state
        state.isAuthenticated = false;
        // Reset any additional state if needed
      });
  },
});

export const userAuthReducer = userAuthSlice.reducer;

export const { login, logout } = userAuthSlice.actions;

// export default userAuthSlice.reducer;
