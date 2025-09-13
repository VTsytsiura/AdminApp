import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import GameChart from "../components/GameChart";
import GameCard from "../components/GameCard";
import GameTable from "../components/GameTable";
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

  useEffect(() => {
    const mockGames: Game[] = [
      {
        id: 1,
        name: "Counter-Strike",
        players: 12,
        score: 250,
        color: "#8b5cf6",
        hours: [2, 3, 4, 5, 3, 2, 4, 5, 6, 7, 6, 5, 4, 3, 2, 4, 6, 7, 6, 5, 4, 3, 2, 1],
      },
      {
        id: 2,
        name: "Dota 2",
        players: 9,
        score: 190,
        color: "#06b6d4",
        hours: [1, 2, 2, 3, 2, 4, 5, 6, 3, 2, 2, 3, 4, 4, 3, 3, 2, 2, 1, 1, 2, 3, 4, 2],
      },
      {
        id: 3,
        name: "FIFA 24",
        players: 4,
        score: 80,
        color: "#f59e0b",
        hours: [0, 0, 0, 1, 1, 2, 3, 2, 1, 1, 1, 2, 3, 2, 1, 0, 0, 1, 1, 1, 2, 2, 1, 0],
      },
      {
        id: 4,
        name: "Minecraft",
        players: 6,
        score: 120,
        color: "#ef4444",
        hours: [0, 1, 1, 2, 3, 4, 4, 5, 4, 4, 3, 2, 2, 1, 1, 1, 2, 3, 3, 2, 1, 1, 0, 0],
      },
    ];

    setGames(mockGames);
  }, []);

  return (
    <div>
        <div className="header-row">
          <h1 className="title">Statistics</h1>
          <div className="header-actions">
            <div className="pill">12 online</div>
            <div className="pill muted">2 on break</div>
          </div>
        </div>

        <section className="cards-area" aria-label="cards">
          {games.map((g) => (
            <GameCard key={g.id} game={g} />
          ))}
        </section>

        <section className="table-area">
          <h2 className="section-title">Game Table</h2>
          <GameTable games={games} />
        </section>
    </div>
  );
};

export default Dashboard;