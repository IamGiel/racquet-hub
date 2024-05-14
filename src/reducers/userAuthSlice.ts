import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { authenticateAndGetUserProfile } from "../actions/userProfileActions";

interface UserAuthState {
  isAuthenticated: boolean;
  payload: any;
  authToken: any;
  // Add more authentication-related state here if needed
}

const initialState: UserAuthState = {
  isAuthenticated: false,
  payload: null,
  authToken: null,
  // Initialize additional state if needed
};

// Define the type for the credentials argument
export interface ICredentials {
  email: string;
  password: string;
  date: string;
}

export const isUserAuthenticated = () => {
  // Check if the user is authenticated based on your authentication logic
  // For example, you might check if there is a token in local storage
  const token = localStorage.getItem('token');
  return !!token; // Return true if token exists, indicating user is authenticated
};

const userAuthSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    logout(state) {
      state.isAuthenticated = false;
      localStorage.clear();
      window.location.reload();
      // Reset any additional state if needed
    },
    login(state) {
      console.log('dispatched login ', state)
      console.log('dispatched isUserAuthenticated ', isUserAuthenticated())
      if (!isUserAuthenticated()) {
        state.isAuthenticated = true;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(authenticateAndGetUserProfile.pending, (state) => {
        // Handle pending state
      })
      .addCase(authenticateAndGetUserProfile.fulfilled, (state, action) => {
        // Handle fulfilled state
        console.log("fulfilled state ", state);
        console.log("fulfilled action ", action);
        // Access the response data directly from the action payload
        const payload: any = action?.payload; // Assuming 'data' contains the response data
        // Update the Redux state with the response data
        if (payload && JSON.parse(payload)?.error) {
          return {
            ...state,
            isAuthenticated: false,
            payload,
          };
        } else if (payload && JSON.parse(payload)?.token) {
          return {
            ...state,
            isAuthenticated: true,
            payload,
          };
        } else {
          return {
            ...state,
            isAuthenticated: true,
            payload,
          };
        }
      })

      // Update the rejected case to store only the error message
      .addCase(authenticateAndGetUserProfile.rejected, (state, action) => {
        // Handle rejected state

        // Access the error message from the response body
        const errorMessage = action.error; // Extract the error message

        // Update the Redux state or display a notification to the user based on the error message
        return {
          ...state,
          isAuthenticated: false,
          payload: errorMessage, // Store only the error message
        };
      });
  },
});

export const userAuthReducer = userAuthSlice.reducer;

export const { logout, login } = userAuthSlice.actions;

// export default userAuthSlice.reducer;
