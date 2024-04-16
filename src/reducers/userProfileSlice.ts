// reducers/userProfileSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import { getUserDetails, getUserProfile } from "../actions/userProfileActions";

const initialState: any = {
  userProfile: null,
  loading: false,
  error: null,
};

const userProfileSlice = createSlice({
  name: "userProfile",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getUserProfile.pending, (state) => {
        state.details = state
        state.loading = true;
        state.error = null;
      })
      // .addCase(getUserProfile.fulfilled, (state, action) => {
      //   state.details = state;
      //   state.loading = false;
      //   state.userProfile = action.payload;
      // })
      // .addCase(getUserProfile.rejected, (state, action) => {
      //   state.details = state;
      //   state.loading = false;
      //   state.error = action.error.message || "Failed to fetch user profile";
      // })
      .addCase(getUserDetails.pending, (state) => {
        state.details = state
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.details = state;
        state.loading = false;
        state.userProfile = action.payload;
      })
      .addCase(getUserDetails.rejected, (state, action) => {
        state.details = state;
        state.loading = false;
        state.error = action.error.message || "Failed to fetch user details";
      });
  },
});

export default userProfileSlice.reducer;
export const userProfileReducer = userProfileSlice.reducer;
