import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Greet } from "./component/Greet/Greet";
import Landing from "./component/Landing/Landing";

import { Provider } from "react-redux";
import store from "./store";
import { DialogLoader } from "./component/Services/dialog-service";

function App() {
  return (
    <div className="App">
      <Landing />
      <div>
        <DialogLoader />
      </div>
    </div>
  );
}

export default App;
