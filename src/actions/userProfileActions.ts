// actions/userProfileActions.ts
import { API_PATH } from '../api/apiPaths';
import fetchData from '../api/apiHelper';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getUserProfile = createAsyncThunk('userProfile/fetch_user_profile', async () => {
  return await fetchData('GET', API_PATH.GET_USER_PROFILE, {}, {});
});

// export const getCountries = createAsyncThunk('countries/fetch_supplier_discovery_countries', async () => {
//   const response = await axios.get<any>(API_PATH.COUNTRIES_FOR_SUPPLIER_DISCOVERY);
//   console.log('getCountries response ', response);
//   return response?.data;
// });
