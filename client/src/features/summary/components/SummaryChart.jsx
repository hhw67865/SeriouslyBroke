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
                Math.max(apiCalls.graphData.data.total_budget, apiCalls.graphData.data.total_expenses) / 100,
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
};

export default SummaryChart;
