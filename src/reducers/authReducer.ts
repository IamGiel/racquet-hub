// authSlice.js
import { Dispatch, ThunkDispatch, createSlice } from '@reduxjs/toolkit';
import { loginApiv2 } from '../apis/fetch';
import { AppDispatch, RootState } from '../store';
import { login } from './userAuthSlice';

const initialState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export const selectUser = (state:any) => state.auth.user;
export const selectIsAuthenticated = (state:any) => state.auth.isAuthenticated;

export const reauthenticateUser = () => async (dispatch: ThunkDispatch<RootState, undefined, any>) => {
  try {
    const token = localStorage.getItem('authToken');
    // console.log('AUTH TOKEN IN REUATH USER ', token)
    if (token) {
      // Attempt to authenticate the user using the token
      const userData = await loginApiv2(undefined, token) // Replace with your authentication API call
      // console.log('user data on reuathenticate user ', userData)
      // dispatch(login)

      dispatch(setUser(JSON.parse(userData))); // Update Redux state with user data if authentication is successful
    } else {
      dispatch(clearUser()); // Clear user data from Redux state if no token is found
    }
  } catch (error) {
    // console.error('Error reauthenticating user:', error);
    dispatch(clearUser()); // Clear user data from Redux state if an error occurs during reauthentication
  }
};

export default authSlice.reducer;
