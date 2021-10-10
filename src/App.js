import { useEffect } from 'react';
import './App.css';
import test from './sqljs-test';


function App() {

  useEffect(() => {
    test();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>sql.js test</p>
      </header>
    </div>
  );
}

export default App;
