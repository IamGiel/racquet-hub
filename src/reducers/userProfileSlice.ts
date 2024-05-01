// reducers/userProfileSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import { editUserDetailsApi } from "../actions/userProfileActions";

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
     
      .addCase(editUserDetailsApi.pending, (state) => {
        state.details = state
        state.loading = true;
        state.error = null;
      })
      .addCase(editUserDetailsApi.fulfilled, (state, action) => {
        state.details = state;
        state.loading = false;
        state.userProfile = action.payload;
      })
      .addCase(editUserDetailsApi.rejected, (state, action) => {
        state.details = state;
        state.loading = false;
        state.error = action.error.message || "Failed to fetch user details";
      });
  },
});

export default userProfileSlice.reducer;
export const userProfileReducer = userProfileSlice.reducer;
