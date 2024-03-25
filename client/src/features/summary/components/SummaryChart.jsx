import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const SummaryChart = ({ summary }) => (
  <div className="p-4">
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={summary.graph_data}>
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="date" />
        <YAxis
          domain={[
            0,
            Math.ceil(
              Math.max(summary.total_budget, summary.total_expenses) / 100,
            ) * 100,
          ]}
        />
        <Line type="monotone" dataKey="total" stroke="red" dot={false} />
        <Line type="monotone" dataKey="budget" stroke="#5F741D" dot={false} />
        <Tooltip />
        <Legend />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export default SummaryChart;
