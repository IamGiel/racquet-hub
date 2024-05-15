// reducers/listOfProposalsSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import { getAllProposals } from "../apis/fetch";
import { fetchProposalsApi } from "../actions/userProfileActions";


const initialState: any = {
  proposals: [],
  loading: false,
  error: null,
};

const listOfProposalsSlice = createSlice({
  name: "listOfProposals",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProposalsApi.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProposalsApi.fulfilled, (state, action) => {
        state.loading = false;
        state.proposals = action.payload;
      })
      .addCase(fetchProposalsApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch proposals";
      });
  },
});

export default listOfProposalsSlice.reducer;
export const listOfProposalsReducer = listOfProposalsSlice.reducer;
