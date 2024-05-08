import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { loginApiv2 } from "../apis/fetch";
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

const userAuthSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    logout(state) {
      state.isAuthenticated = false;
      localStorage.clear();
      window.location.reload()
      // Reset any additional state if needed
    },
  },
  extraReducers(builder) {
    builder
      .addCase(authenticateAndGetUserProfile.pending, (state) => {
        // Handle pending state
      })
      .addCase(authenticateAndGetUserProfile.fulfilled, (state, action) => {
        // Handle fulfilled state

        // Access the response data directly from the action payload
        const responseData:any = action?.payload; // Assuming 'data' contains the response data
        // Update the Redux state with the response data
        if(responseData && JSON.parse(responseData)?.error){
          return {
            ...state,
            isAuthenticated: false,
            payload: responseData,
          };
        } else if(responseData && JSON.parse(responseData)?.token){
          return {
            ...state,
            isAuthenticated: true,
            payload: responseData,
          };
        } else {
          return {
            ...state,
            isAuthenticated: true,
            payload: action?.meta?.arg?.token,
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

export const { logout } = userAuthSlice.actions;

// export default userAuthSlice.reducer;
