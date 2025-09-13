import React from "react";

interface Game {
  id: number;
  name: string;
  players: number;
  score: number;
  hours: number[];
  color?: string;
}

const GameCard: React.FC<{ game: Game }> = ({ game }) => {
  const avg =
    game.hours && game.hours.length
      ? (game.hours.reduce((a, b) => a + b, 0) / game.hours.length).toFixed(1)
      : "0.0";

  return (
    <div className="game-card">
      <div className="card-top">
        <div className="game-avatar" style={{ background: game.color ?? "#333" }}>
          {game.name.charAt(0)}
        </div>
        <div>
          <div className="game-name">{game.name}</div>
          <div className="game-meta">Players: <strong>{game.players}</strong></div>
        </div>
      </div>

      <div className="card-body">
        <div className="stat">
          <div className="stat-value">{game.score}</div>
          <div className="stat-label">Score</div>
        </div>

        <div className="stat">
          <div className="stat-value">{avg}h</div>
          <div className="stat-label">Avg Hours</div>
        </div>
      </div>
    </div>
  );
};

export default GameCard;