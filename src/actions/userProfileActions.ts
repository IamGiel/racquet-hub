import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { editUserDetals, getAllProposals, loginApiv2 } from "../apis/fetch";

interface UserAuthState {
  isAuthenticated: boolean;
  user: any; // Updated to store user details
  authToken: any;
}

const initialState: UserAuthState = {
  isAuthenticated: false,
  user: null,
  authToken: null,
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
      state.user = null; // Reset user details on logout
      localStorage.clear();
      window.location.reload();
    },
  },
  extraReducers(builder) {
    builder
      .addCase(authenticateAndGetUserProfile.fulfilled, (state, action) => {
        const responseData: any = action.payload;

        if (responseData && responseData.error) {
          state.isAuthenticated = false;
          state.user = null;
        } else if (responseData && responseData.token) {
          state.isAuthenticated = true;
          state.user = responseData.user; // Assuming responseData contains user details
          state.authToken = responseData.token;
        }
      })
      .addCase(authenticateAndGetUserProfile.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.user = null;
        state.authToken = null;
      })
  },
});

export const userAuthReducer = userAuthSlice.reducer;
export const { logout } = userAuthSlice.actions;

// Define async thunk action creator to authenticate user and fetch user profile data
export const authenticateAndGetUserProfile = createAsyncThunk(
  "userProfile/authenticate_and_fetch",
  async (payload: ICredentials) => {
    return await loginApiv2(payload, undefined); // call api
  }
);


export const fetchProposalsApi = createAsyncThunk(
  "listOfProposals/fetchProposals",
  async (_, { rejectWithValue }) => {
    try {
      return await getAllProposals()
    } catch (error) {
     
      return rejectWithValue(error);
    }
  }
);


export const editUserDetailsApi = createAsyncThunk(
  "userProfile/get_user_details",
  async (payload: any) => {
    return await editUserDetals(payload)
  }
);
