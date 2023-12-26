import getWeek from "../../../utils/getWeek";

const WeekSelector = ({
  startOfWeek,
  endOfWeek,
  currentWeek,
  setCurrentWeek,
}) => {
  const weekStart = startOfWeek.toLocaleDateString();
  const weekEnd = endOfWeek.toLocaleDateString();
  const weekNumber = getWeek(startOfWeek);

  const handlePreviousWeek = () => {
    setCurrentWeek(currentWeek - 7 * 24 * 60 * 60 * 1000); // Subtract 7 days
  };

  const handleNextWeek = () => {
    setCurrentWeek(currentWeek + 7 * 24 * 60 * 60 * 1000); // Add 7 days
  };

  return (
    <div className="left-0 top-0 flex w-full items-center justify-between rounded-md bg-white px-4 py-2">
      <button
        onClick={handlePreviousWeek}
        className="text-blue-500 hover:underline"
      >
        &#8592; Previous Week
      </button>
      <div>
        <h2 className="text-center text-lg font-bold">Week {weekNumber}</h2>
        <span className="text-lg font-bold">
          {weekStart} - {weekEnd}
        </span>
      </div>
      <button
        onClick={handleNextWeek}
        className="text-blue-500 hover:underline"
      >
        Next Week &#8594;
      </button>
    </div>
  );
};
export default WeekSelector;
