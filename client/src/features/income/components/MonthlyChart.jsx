import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';

const MonthlyChart = ({ incomeSummary, setMonths, months }) => {
  const handleChange = (event) => {
    setMonths(Number(event.target.value));
  };
  const COLORS = ['#6c5b7b', '#c06c84', '#f8b195', '#355c7d', '#a8a2a2', '#d6d1b1', '#e8ddb5']; // Adjusted color palette

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-700 mb-2">Monthly Income Summary</h2>
      <p className="text-gray-500 mb-6">This chart shows the income summary for the past few months.</p>

      <div className="mb-4 relative inline-block w-64">
        <select
          value={months}
          onChange={handleChange}
          className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
        >
          {[...Array(13).keys()].slice(1).map((month) => (
            <option key={month} value={month}>
              {month} months
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M10 12l-6-6h12l-6 6z" />
          </svg>
        </div>
      </div>

      <BarChart
        width={1200}
        height={300}
        data={incomeSummary.graph_data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        {incomeSummary.income_sources.map((source, i) => {
          return <Bar key={i} dataKey={source} stackId="a" fill={COLORS[i % COLORS.length]} />
        })}
      </BarChart>
    </div>
  );
};

export default MonthlyChart;