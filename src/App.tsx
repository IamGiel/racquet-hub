import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Greet } from './component/Greet/Greet';
import Landing from './component/Landing/Landing';

import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <div className="App">
      <Landing />
    </div>
  );
}

export default App;
