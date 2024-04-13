import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Greet } from "./component/Greet/Greet";
import Landing from "./component/Landing/Landing";

import { Provider } from "react-redux";
import store from "./store";
import { DialogLoader } from "./component/Services/dialog-service";
import getStore from "./store";

function App() {
  const store = getStore();

  return (
    <div className="App">
      <Provider store={store}>
        <Landing />
        <div>
          <DialogLoader />
        </div>
      </Provider>
    </div>
  );
}

export default App;
