import { combineReducers } from "@reduxjs/toolkit";
import { userProfileReducer } from "./userProfileSlice";
import { userAuthReducer } from "./userAuthSlice";
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

// Combine your reducers into a root reducer
const rootReducer = combineReducers({
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
