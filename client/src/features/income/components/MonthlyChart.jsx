import { useEffect, useState } from "react";
import fetchAxios from "../../../lib/fetchAxios";

import { BarChart } from '@mui/x-charts/BarChart';


const MonthlyChart = ({session}) => {

  const [graphData, setGraphData] = useState(null);
  const [months, setMonths] = useState(6);

  useEffect(() => {
    fetchAxios({ method: "GET", url: "/api/graph_data", params: {months: months} }, session).then((res) => {
      setGraphData(res.data); 
    });
  }, [months]);

  const handleChange = (event) => {
    setMonths(Number(event.target.value));
   };

  if (graphData === null) {
    return null;
  }

  return (
    <>
      <div className="flex justify-center mb-4">
        <select 
          value={months} 
          onChange={handleChange} 
          className="w-64 border border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
}
export default MonthlyChart;