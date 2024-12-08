import { Link } from "react-router-dom";
import { WeekViewer, ExpenseForm } from "../features/expense-edit";
import { useState, useContext } from "react";
import { InformationContainer } from "../features/weekly-expense-info";
import { ApiContext } from "../context/ApiContext";

const Expenses = () => {
  const apiCalls = useContext(ApiContext);
  const [currentWeek, setCurrentWeek] = useState(() => {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    return startOfDay.getTime();
  });

  const startOfWeek = new Date(currentWeek);
  let dayOfWeek = startOfWeek.getDay();
  dayOfWeek = (dayOfWeek === 0 ? 7 : dayOfWeek) - 1; // Adjust for Monday start
  startOfWeek.setDate(startOfWeek.getDate() - dayOfWeek);
  startOfWeek.setHours(0, 0, 0, 0); // Set the time to the start of the day to avoid DST issues
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(endOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999); // Set the time to the end of the day to avoid DST issues

  const weeklyExpenses = apiCalls.expenses.data.filter((expense) => {
    const dateParts = expense.date.split("-");
    const date = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
    date.setHours(12, 0, 0, 0); // Set the time to midday to avoid DST issues
    return date >= startOfWeek && date <= endOfWeek;
  });

  return (
    <div className="flex w-full flex-col items-center">
      <Link
        to="/categories"
        className="focus:shadow-outline mx-auto mt-4 w-[90%] rounded px-4 py-2 text-end font-bold text-white hover:underline focus:outline-none"
      >
        Edit Categories/Budget
      </Link>
      <WeekViewer
        startOfWeek={startOfWeek}
        endOfWeek={endOfWeek}
        currentWeek={currentWeek}
        setCurrentWeek={setCurrentWeek}
        weeklyExpenses={weeklyExpenses}
      />
      <div className="container flex flex-col place-content-between gap-10 md:flex-row">
        <ExpenseForm />
        <InformationContainer weeklyExpenses={weeklyExpenses} />
      </div>
    </div>
  );
};
export default Expenses;
