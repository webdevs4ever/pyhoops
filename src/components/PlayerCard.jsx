import React from 'react';
import { Link } from 'react-router-dom';
import './PlayerCard.css';

function PlayerCard({ player }) {
  return (
    <div className="player-card">
      <div className="card-inner">
        {/* Front of card */}
        <div className="card-front">
          <div className="player-photo">{player.initials}</div>
          <h3 className="player-name">{player.name}</h3>
          <p className="jersey-number">#{player.jersey}</p>
        </div>

        {/* Back of card */}
        <div className="card-back">
          <h4 className="stats-title">Last 10 Games</h4>
          <table className="stats-table">
            <thead>
              <tr>
                <th>PTS</th>
                <th>REB</th>
                <th>AST</th>
              </tr>
            </thead>
            <tbody>
              {player.last_10_preview && player.last_10_preview.map((game, idx) => (
                <tr key={idx}>
                  <td>{game.points}</td>
                  <td>{game.rebounds}</td>
                  <td>{game.assists}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Link to={`/player/${player.id}`} className="more-link">
            More
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PlayerCard;
