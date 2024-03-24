const currentYear = new Date().getFullYear();
const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

const YearSelector = ({ year, setYear }) => {
  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        Select Year
      </label>
      <div className="relative mt-1 rounded-md shadow-sm">
        <select
          value={year}
          onChange={handleYearChange}
          className="block w-full rounded-md border-gray-300 pr-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="">All Years</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default YearSelector;
