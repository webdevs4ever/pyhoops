import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PlayerCard from '../components/PlayerCard';
import './Landing.css';

function Landing() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBalls, setSelectedBalls] = useState(new Set());

  // Generate random positions for basketballs
  const basketballs = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    left: Math.random() * 90 + 5, // 5-95%
    top: Math.random() * 80 + 10, // 10-90%
    size: Math.random() * 30 + 40, // 40-70px
    duration: Math.random() * 3 + 4, // 4-7s rotation
    delay: Math.random() * 2, // 0-2s delay
  }));

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    try {
      const response = await axios.get('http://localhost:5005/api/players');
      setPlayers(response.data.players);
      setLoading(false);
    } catch (err) {
      setError('Failed to load players. Make sure the backend is running!');
      setLoading(false);
      console.error('Error fetching players:', err);
    }
  };

  const toggleBallSelection = (ballId) => {
    setSelectedBalls(prev => {
      const newSet = new Set(prev);
      if (newSet.has(ballId)) {
        newSet.delete(ballId);
      } else {
        newSet.add(ballId);
      }
      return newSet;
    });
  };

  if (loading) {
    return <div className="loading">Loading players... 🏀</div>;
  }

  if (error) {
    return (
      <div className="container">
        <div className="error">
          <h3>Error</h3>
          <p>{error}</p>
          <p style={{ marginTop: '10px', fontSize: '0.9rem' }}>
            Run: <code>cd backend && python app.py</code>
          </p>
        </div>
      </div>
    );
  }

  // Find hot streak player (example: first player or one with highest recent avg)
  const hotStreakPlayer = players.length > 0 ? players[0] : null;

  // Show bonus tip only when at least one ball is selected
  const showBonusTip = selectedBalls.size > 0;

  return (
    <div className="container">
      {/* Spinning Basketballs Background */}
      <div className="basketballs-container">
        {basketballs.map((ball) => (
          <div
            key={ball.id}
            className={`spinning-ball ${selectedBalls.has(ball.id) ? 'lit-up' : ''}`}
            style={{
              left: `${ball.left}%`,
              top: `${ball.top}%`,
              width: `${ball.size}px`,
              height: `${ball.size}px`,
              animationDuration: `${ball.duration}s`,
              animationDelay: `${ball.delay}s`,
            }}
            onClick={() => toggleBallSelection(ball.id)}
          >
            🏀
          </div>
        ))}
      </div>

      {/* Bonus Tip Box - only shows when a ball is clicked */}
      {showBonusTip && hotStreakPlayer && (
        <div className="bonus-tip-box">
          <span className="bonus-label">Bonus tip</span>
          <span className="bonus-text">
            {hotStreakPlayer.name} is on a hot streak 🔥
          </span>
        </div>
      )}

      <div className="landing-note">
        <strong>💡 Hover over cards to flip them!</strong> Click "More" to see full stats.
      </div>
      
      <div className="player-grid">
        {players.map(player => (
          <PlayerCard key={player.id} player={player} />
        ))}
      </div>
      
      <div className="dev-note">
        <p>
          <strong>📝 v1.0 Note:</strong> These 5 players are hardcoded. 
          Code for dynamic top performer selection is commented out in the backend.
        </p>
      </div>
    </div>
  );
}

export default Landing;   