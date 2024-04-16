import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Greet } from "./component/Greet/Greet";
import Landing from "./component/Landing/Landing";

import { Provider } from "react-redux";
import store from "./store";
import { DialogLoader } from "./component/Services/dialog-service";
import getStore from "./store";
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { Profile } from "./component/Profile/Profile";
import { Header } from "./component/Header/Header";

function App() {
  const store = getStore();

  return (
    <div className="App">
    
    <Provider store={store}>
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
      <div>
        <DialogLoader />
      </div>
    </Provider>
  </div>
  );
}

export default App;
