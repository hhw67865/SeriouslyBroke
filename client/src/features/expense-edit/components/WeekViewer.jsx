import { useEffect, useState } from "react";
import fetchAxios from "../../../lib/fetchAxios";
import WeekSelector from "./WeekSelector";
import WeekViewerColumn from "./WeekViewerColumn";

const WeekViewer = ({ session, update, updateExpenses }) => {
  const [currentWeek, setCurrentWeek] = useState(() => {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    return startOfDay.getTime();
  });
  const [expenses, setExpenses] = useState([]);
  const [editingExpenseId, setEditingExpenseId] = useState(null);

  useEffect(() => {
    fetchAxios(
      {
        method: "GET",
        url: "/api/expenses",
      },
      session,
    ).then((res) => {
      setExpenses(res.data);
    });
  }, [update]);

  const startOfWeek = new Date(currentWeek);
  let dayOfWeek = startOfWeek.getDay();
  dayOfWeek = (dayOfWeek === 0 ? 7 : dayOfWeek) - 1; // Adjust for Monday start
  startOfWeek.setDate(startOfWeek.getDate() - dayOfWeek);
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(endOfWeek.getDate() + 6);

  return (
    <div className="w-[90%] rounded-md bg-gray-100 p-6 shadow-md">
      <WeekSelector
        startOfWeek={startOfWeek}
        endOfWeek={endOfWeek}
        currentWeek={currentWeek}
        setCurrentWeek={setCurrentWeek}
      />
      <div className="mt-6 grid grid-cols-7 gap-1">
        {Array.from({ length: 7 }, (_, i) => {
          const date = new Date(startOfWeek);
          date.setDate(date.getDate() + i);
          const formattedDate = date.toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
          });
          const dailyExpenses = expenses.filter(
            (expense) => expense.date === date.toISOString().split("T")[0],
          );
          return (
            <WeekViewerColumn
              key={i}
              session={session}
              formattedDate={formattedDate}
              dailyExpenses={dailyExpenses}
              editingExpenseId={editingExpenseId}
              updateExpenses={updateExpenses}
              setEditingExpenseId={setEditingExpenseId}
            />
          );
        })}
      </div>
    </div>
  );
};
export default WeekViewer;
