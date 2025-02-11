import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Welcome } from './pages/Welcome';
import { Game } from './pages/Game';
import { RoseView } from './pages/RoseView';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/game" element={<Game />} />
        <Route path="/view" element={<RoseView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;