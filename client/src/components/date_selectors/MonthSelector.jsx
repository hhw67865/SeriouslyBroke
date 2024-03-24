const MonthSelector = ({month, setMonth}) => {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">Select Month</label>
      <div className="mt-1 relative rounded-md shadow-sm">
        <select 
          value={month} 
          onChange={handleMonthChange} 
          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pr-10 sm:text-sm border-gray-300 rounded-md"
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
}

export default MonthSelector;