import { useState, useContext } from "react";
import WeekSelector from "./WeekSelector";
import WeekViewerColumn from "./WeekViewerColumn";
import WeeklyTotal from "./WeeklyTotal";
import { ApiContext } from "../../../context/ApiContext";

const WeekViewer = ({
  startOfWeek,
  endOfWeek,
  currentWeek,
  setCurrentWeek,
  weeklyExpenses,
}) => {
  const apiCalls = useContext(ApiContext);
  const [editingExpenseId, setEditingExpenseId] = useState(null);

  const weekColumns = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startOfWeek);
    date.setDate(date.getDate() + i);
    const formattedDate = date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
    const dailyExpenses = apiCalls.expenses.data.filter(
      (expense) => expense.date === date.toISOString().split("T")[0],
    );

    return (
      <WeekViewerColumn
        key={i}
        formattedDate={formattedDate}
        dailyExpenses={dailyExpenses}
        editingExpenseId={editingExpenseId}
        setEditingExpenseId={setEditingExpenseId}
      />
    );
  });

  return (
    <div className="w-[90%] rounded-md bg-gray-100 p-6 shadow-md">
      <WeekSelector
        startOfWeek={startOfWeek}
        endOfWeek={endOfWeek}
        currentWeek={currentWeek}
        setCurrentWeek={setCurrentWeek}
      />
      <div className="mt-6 grid grid-cols-7 gap-1">{weekColumns}</div>
      <WeeklyTotal weeklyExpenses={weeklyExpenses} />
    </div>
  );
};
export default WeekViewer;
