import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PlayerCard from '../components/PlayerCard';
import './Landing.css';

function Landing() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <div className="container">
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
