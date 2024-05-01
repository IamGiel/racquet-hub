// actions/userProfileActions.ts
import { API_PATH } from "../api/apiPaths";
import fetchData from "../api/apiHelper";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { error } from "console";
import { editUserDetals, loginApiv2 } from "../apis/fetch";
import { Dispatch } from 'redux';

export const getUserProfile = createAsyncThunk(
  "userProfile/fetch_user_profile",
  async () => {
    return await fetchData("GET", API_PATH.GET_USER_PROFILE, {}, {});
  }
);
export const getUserDetails = createAsyncThunk(
  "userDetails/fetch_user_details",
  async () => {
    return await fetchData("GET", API_PATH.GET_USER_DETAILS, {}, {});
  }
);

// Define async thunk action creator to authenticate user and fetch user profile data
export const authenticateAndGetUserProfile = createAsyncThunk(
  "userProfile/authenticate_and_fetch",
  async (payload: any) => {
    return await loginApiv2(payload)
  }
);

export const editUserDetailsApi = createAsyncThunk(
  "userProfile/get_user_details",
  async (payload: any) => {
    return await editUserDetals(payload)
  }
);
