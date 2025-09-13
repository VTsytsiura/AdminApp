import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface Game {
  id: number;
  name: string;
  players: number;
  score: number;
  hours: number[];
  color: string;
}

interface Props {
  games: Game[];
  highlightedGame?: string | null;
}

const GameChart: React.FC<Props> = ({ games, highlightedGame }) => {
  const maxHours = Math.max(...games.map((g) => g.hours.length));
  const colors: string[] = [];
  const chartData = Array.from({ length: maxHours }).map((_, i) => {
    const point: any = { time: `${i + 1}h` };
    games.forEach((g) => {
      point[g.name] = g.hours[i] ?? 0;
      colors.push(g.color);
    });
    return point;
  });

  return (
    <div className="bg-[#1a1a24] rounded-2xl p-4 shadow-md h-72">
      <h2 className="text-lg font-semibold mb-4 text-white">Active Hours</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <XAxis dataKey="time" stroke="#aaa" />
          <YAxis stroke="#aaa" />
          <Tooltip />
          {games.map((g, idx) => (
            <Line
              key={g.id}
              type="monotone"
              dataKey={g.name}
              stroke={colors[idx % colors.length]}
              strokeWidth={highlightedGame === g.name ? 4 : 2}
              opacity={highlightedGame && highlightedGame !== g.name ? 0.2 : 1}
              dot={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GameChart;