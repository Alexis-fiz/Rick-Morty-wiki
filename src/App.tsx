import { Routes, Route } from "react-router-dom";
import { Counter } from './features/counter/Counter';
import Characters from './features/Characters/Characters';
import Character from './features/Charactrer/Character';

import './App.css';
import Header from "./layouts/Header";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Header/>}>
          <Route index element={<Counter />} />
          <Route path="characters" element={<Characters />} />
          <Route path="characters/:id" element={<Character />} />
        </Route >

      </Routes>
    </div>
  );
}

export default App;
