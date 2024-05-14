import { combineReducers } from "@reduxjs/toolkit";
import { userProfileReducer } from "./userProfileSlice";
import { userAuthReducer } from "./userAuthSlice";
import authReducer from "./authReducer";

// Combine your reducers into a root reducer
const rootReducer = combineReducers({
  auth:authReducer,
  userAuth: userAuthReducer,
  userProfile: userProfileReducer,
});

// Optionally, if you want to handle resetting state in reducers
// export const RESET_ALL = "RESET_ALL";
// const resettableRootReducer = (state, action) => {
//   if (action.type === RESET_ALL) {
//     // Handle resetting state here
//   }
//   return rootReducer(state, action);
// };

// Export the root reducer
export default rootReducer;
