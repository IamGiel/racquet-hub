// reducers/index.ts
import { combineReducers } from 'redux';
import userProfileSlice from './userProfileSlice';

const rootReducer = combineReducers({
  userProfile: userProfileSlice,
  // Add more reducers as needed
});

export default rootReducer;
