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
import { ApiContext } from "../../../context/ApiContext";
import { useContext } from "react";

const SummaryChart = () => {
  const apiCalls = useContext(ApiContext);
  return (
    <div className="p-4">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={apiCalls.graphData.data.expenses_graph_data}>
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="date" />
          <YAxis
            domain={[
              0,
              Math.ceil(
                Math.max(
                  apiCalls.graphData.data.total_budget,
                  apiCalls.graphData.data.total_expenses,
                  apiCalls.graphData.data.prev_total_expenses,
                ) / 100,
              ) * 100,
            ]}
          />
          <Line
            type="monotone"
            dataKey="total"
            stroke="red"
            dot={false}
            name="Current Month"
          />
          <Line
            type="monotone"
            dataKey="budget"
            stroke="#5F741D"
            dot={false}
            name="Budget"
          />
          <Line
            type="monotone"
            dataKey="prev_total"
            stroke="#A9C4EB"
            strokeDasharray="5 5"
            strokeWidth={2}
            dot={false}
            opacity={0.6}
            name="Previous Month"
          />
          <Tooltip />
          <Legend />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SummaryChart;
