import React from 'react';
import './App.css';
import Find from './component/Find';

function App() {
  return (
    <div className="App">
      <header>
        <h1>
          Find out how popular you are!
        </h1>
      </header>
      <div>
        <Find/>
      </div>
    </div>
  );
}

export default App;
