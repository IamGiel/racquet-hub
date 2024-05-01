import React, { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  RouteProps,
  BrowserRouter,
} from "react-router-dom";
import { Header } from "./component/Header/Header";
import { Profile } from "./component/Profile/Profile";
import { DialogLoader } from "./component/Services/dialog-service";
import Landing from "./component/Landing/Landing";
import rootReducer from "./reducers";
import store, { useAppSelector } from "./store";
import RoutesComponent from "./component/Routes/Routes";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <RoutesComponent />
        </BrowserRouter>
        
        <div>
          <DialogLoader />
        </div>
      </div>
    </Provider>
  );
}

export default App;
