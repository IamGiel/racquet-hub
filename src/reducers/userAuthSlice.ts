import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { loginApi, loginApiv2 } from "../apis/fetch";

interface UserAuthState {
  isAuthenticated: boolean;
  payload: any;
  authToken:any
  // Add more authentication-related state here if needed
}

const initialState: UserAuthState = {
  isAuthenticated: false,
  payload: null,
  authToken: null
  // Initialize additional state if needed
};

// Define the type for the credentials argument
export interface ICredentials {
  username: string;
  password: string;
  date: string;
}
// Create an async thunk to handle the login process
export const getSession = createAsyncThunk(
  "userAuth/getSession",
  async (credentials: ICredentials, { rejectWithValue }) => {
    try {
      const response:any = await loginApiv2(credentials);
      const responseObj = JSON.parse(response)
      localStorage.setItem('authToken', `${responseObj?.token}`);
      return response;
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
      console.log("login reducer called ", state);
      // do i call getSession here to login user ?
      // state.isAuthenticated = true;
    },
    logout(state) {
      console.log('logout state ', state)
      state.isAuthenticated = false;
      localStorage.clear()
      console.log('locastorate should have been cleared')
      // Reset any additional state if needed
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getSession.pending, (state) => {
        // Handle pending state
        console.log("pending getSession State ", state);
      })
      .addCase(getSession.fulfilled, (state, action: any) => {
        // Handle fulfilled state
        console.log("fullfilled getSession State ", state);
        console.log("fullfilled getSession action ", action);
        return {
          ...state,
          isAuthenticated: true,
          payload: action.payload,
        };
      })
      .addCase(getSession.rejected, (state, action) => {
        // Handle rejected state
        console.log("rejected getSession State ", state);
        state.isAuthenticated = false;
        // Reset any additional state if needed
      });
  },
});

export const userAuthReducer = userAuthSlice.reducer;

export const { login, logout } = userAuthSlice.actions;

// export default userAuthSlice.reducer;
