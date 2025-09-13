import React from "react";

interface Game {
  id: number;
  name: string;
  players: number;
  score: number;
  hours: number[];
}

const GameTable: React.FC<{ games: Game[] }> = ({ games }) => {
  return (
    <div className="table-card">
      <table className="game-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Players</th>
            <th>Score</th>
          </tr>
        </thead>

        <tbody>
          {games.map((g) => (
            <tr key={g.id}>
              <td>{g.name}</td>
              <td>{g.players}</td>
              <td>{g.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GameTable;