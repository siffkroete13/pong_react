import React from 'react';
import './css/App.css';
import Game from './Game';
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Game title="Pong Game!"/>
      </div>
    </Provider>
  );
}

export default App;
