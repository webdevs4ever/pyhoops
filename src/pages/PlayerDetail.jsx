import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './PlayerDetail.css';

function PlayerDetail() {
  const { playerId } = useParams();
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPlayerDetail();
  }, [playerId]);

  const fetchPlayerDetail = async () => {
    try {
      const response = await axios.get(`http://localhost:5005/api/players/${playerId}`);
      setPlayer(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load player details');
      setLoading(false);
      console.error('Error fetching player:', err);
    }
  };

  if (loading) return <div className="loading">Loading player details... 🏀</div>;
  if (error) return <div className="error">{error}</div>;
  if (!player) return <div className="error">Player not found</div>;

  return (
    <div className="container">
      <Link to="/" className="back-link">← Back to Players</Link>
      
      <div className="player-detail-header">
        <div className="detail-photo">{player.initials}</div>
        <div className="detail-info">
          <h2>{player.name}</h2>
          <p>{player.team} | #{player.jersey} | {player.position}</p>
        </div>
      </div>

      <div className="stats-section">
        <h3 className="section-title">Last 10 Games - Detailed Stats</h3>
        <div className="table-container">
          <table className="detailed-stats-table">
            <thead>
              <tr>
                <th>Game</th>
                <th>PTS</th>
                <th>REB</th>
                <th>AST</th>
                <th>STL</th>
                <th>BLK</th>
                <th>FG%</th>
                <th>3P%</th>
              </tr>
            </thead>
            <tbody>
              {player.last_10_games.map((game, idx) => (
                <tr key={idx}>
                  <td>{game.opponent}</td>
                  <td>{game.points}</td>
                  <td>{game.rebounds}</td>
                  <td>{game.assists}</td>
                  <td>{game.steals}</td>
                  <td>{game.blocks}</td>
                  <td>{game.fg_pct}%</td>
                  <td>{game.three_pct}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="stats-section">
        <h3 className="section-title">Season Average</h3>
        <div className="season-average">
          <div className="stat-card">
            <div className="stat-label">Points</div>
            <div className="stat-value">{player.season_average.points}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Rebounds</div>
            <div className="stat-value">{player.season_average.rebounds}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Assists</div>
            <div className="stat-value">{player.season_average.assists}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Steals</div>
            <div className="stat-value">{player.season_average.steals}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Blocks</div>
            <div className="stat-value">{player.season_average.blocks}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">FG%</div>
            <div className="stat-value">{player.season_average.fg_pct}%</div>
          </div>
        </div>
      </div>

      <Link to={`/quiz/${playerId}`} className="quiz-button">
        Enter Quiz Mode
      </Link>
    </div>
  );
}

export default PlayerDetail;
