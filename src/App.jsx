import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import PlayerDetail from './pages/PlayerDetail';
import QuizMode from './pages/QuizMode';

function App() {
  return (
    <Router>
      <div className="app">
        <header className="header">
          <h1 className="app-title">PyHoops</h1>
          <p className="tagline">Fantasy Basketball Predictions</p>
        </header>
        
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/player/:playerId" element={<PlayerDetail />} />
          <Route path="/quiz/:playerId" element={<QuizMode />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
