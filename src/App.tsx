import React from 'react';
import { Routes, Route } from "react-router-dom";
import { Counter } from './features/counter/Counter';
import Characters from './features/characters/Characters';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Counter />} />
        <Route path="/characters" element={<Characters />} />

      </Routes>
    </div>
  );
}

export default App;
