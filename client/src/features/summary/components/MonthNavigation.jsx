const MonthNavigation = ({ summaryMonth, setSummaryMonth }) => {
  const changeMonth = (monthsToAdd) => {
    setSummaryMonth(
      new Date(summaryMonth.setMonth(summaryMonth.getMonth() + monthsToAdd)),
    );
  };

  return (
    <div className="flex items-center justify-between text-gray-700">
      <button
        className="text-4xl font-extrabold"
        onClick={() => changeMonth(-1)}
      >
        &#8592;
      </button>
      <div className="text-2xl font-extrabold">
        {summaryMonth.toLocaleString("default", { month: "long" })}{" "}
        {summaryMonth.getFullYear()}
      </div>
      <button
        className="text-4xl font-extrabold"
        onClick={() => changeMonth(1)}
      >
        &#8594;
      </button>
    </div>
  );
};
export default MonthNavigation;
