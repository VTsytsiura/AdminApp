import React, { useEffect, useState } from "react";
import GameCard from "../components/game/GameCard";
import GameChart from "../components/game/GameChart";
import GameTable from "../components/game/GameTable";
import "./Dashboard.css";

interface Game {
  id: number;
  name: string;
  players: number;
  score: number;
  hours: number[];
  color?: string;
}

const Dashboard: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [hoveredGame, setHoveredGame] = useState<string | null>(null);

  useEffect(() => {
    const mockGames: Game[] = [
      {
        id: 1,
        name: "Counter-Strike",
        players: 12,
        score: 250,
        color: "#8b5cf6",
        hours: [2, 3, 4, 5, 3, 2, 4, 5, 6, 7],
      },
      {
        id: 2,
        name: "Dota 2",
        players: 9,
        score: 190,
        color: "#06b6d4",
        hours: [1, 2, 2, 3, 2, 4, 5, 6, 3, 2],
      },
      {
        id: 3,
        name: "FIFA 24",
        players: 4,
        score: 80,
        color: "#f59e0b",
        hours: [0, 0, 0, 1, 1, 2, 3, 2, 1, 1],
      },
    ];
    setGames(mockGames);
  }, []);

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="header-row">
        <h1 className="title">Statistics</h1>
        <div className="header-actions">
          <div className="pill">12 online</div>
          <div className="pill muted">2 on break</div>
        </div>
      </div>

      {/* Cards */}
      <section className="cards-area">
        {games.map((g) => (
          <div
            key={g.id}
            onMouseEnter={() => setHoveredGame(g.name)}
            onMouseLeave={() => setHoveredGame(null)}
          >
            <GameCard game={g} />
          </div>
        ))}
      </section>

      {/* Chart */}
      <section className="charts-area">
        <GameChart games={games} highlightedGame={hoveredGame} />
      </section>

      {/* Table */}
      <section className="table-area">
        <h2 className="section-title">Game Table</h2>
        <GameTable games={games} />
      </section>
    </div>
  );
};

export default Dashboard;