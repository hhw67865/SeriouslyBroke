

import { BarChart } from "@mui/x-charts/BarChart";

const MonthlyChart = ({ graphData, setMonths, months }) => {

  const handleChange = (event) => {
    setMonths(Number(event.target.value));
  };

  if (graphData === null) {
    return null;
  }

  return (
    <>
      <div className="mb-4 flex justify-center">
        <select
          value={months}
          onChange={handleChange}
          className="w-64 rounded-md border border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          {[...Array(13).keys()].slice(1).map((month) => (
            <option key={month} value={month}>
              {month} months
            </option>
          ))}
        </select>
      </div>
      <BarChart
        width={1000}
        height={300}
        series={graphData.series}
        xAxis={[graphData.xAxis]}
      />
    </>
  );
};
export default MonthlyChart;
