import { Routes, Route } from "react-router-dom";
import { Counter } from './features/counter/Counter';
import Characters from './features/characters/Characters';
import Character from './features/character/Character';

import './App.css';
import Header from "./layouts/Header";
import GuessGame from "./features/guess-game/GuessGame";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Header/>}>
          <Route index element={<Counter />} />
          <Route path="characters" element={<Characters />} />
          <Route path="characters/:id" element={<Character />} />
          <Route path="guess-game" element={<GuessGame />} />
        </Route >

      </Routes>
    </div>
  );
}

export default App;
