import { useSearchParams } from "react-router-dom";

const MonthSelector = ({ month }) => {
  const [, setSearchParams] = useSearchParams();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const setMonth = (newMonth) => {
    setSearchParams(
      (prev) => {
        prev.set("month", newMonth);
        return prev;
      },
      { replace: true },
    );
  };

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        Select Month
      </label>
      <div className="relative mt-1 rounded-md shadow-sm">
        <select
          value={month}
          onChange={handleMonthChange}
          className="block w-full rounded-md border-gray-300 pr-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="">All Months</option>
          {months.map((month, index) => (
            <option key={index} value={index + 1}>
              {month}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default MonthSelector;
