import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface Game {
  id: number;
  name: string;
  players: number;
  score: number;
  hours: number[];
}

interface Props {
  games: Game[];
}

const GameChart: React.FC<Props> = ({ games }) => {
  const chartData = Array.from({ length: 10 }).map((_, i) => {
    const point: any = { time: `${i + 1}h` };
    games.forEach((g) => {
      point[g.name] = g.hours[i];
    });
    return point;
  });

  return (
    <div className="bg-[#1a1a24] rounded-2xl p-4 shadow-md h-72">
      <h2 className="text-lg font-semibold mb-4">Active Hours</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <XAxis dataKey="time" stroke="#aaa" />
          <YAxis stroke="#aaa" />
          <Tooltip />
          {games.map((g, idx) => (
            <Line
              key={g.id}
              type="monotone"
              dataKey={g.name}
              stroke={["#8b5cf6", "#22c55e", "#f59e0b"][idx % 3]}
              strokeWidth={2}
              dot={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GameChart;