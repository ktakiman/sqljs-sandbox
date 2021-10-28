import React from 'react';
import './App.css';
import SqlView from './sqlview';

function App() {

  return (
    <div className="App">
      <div>
        <a target="https://www.sqlitetutorial.net/sqlite-sample-database/">Table structure</a>
      </div>
      <SqlView />
    </div>
  );
}

export default App;
