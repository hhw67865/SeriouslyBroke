import { Link } from "react-router-dom";
import { WeekViewer, ExpenseForm } from "../features/expense-edit";
import { SessionContext } from "../context/SessionContext";
import { useContext } from "react";


const Expenses = ({ getExpenses, getCategories }) => {
  const session = useContext(SessionContext);

  return (
    <div className="flex w-full flex-col items-center">
      <Link
        to="/expenses/categories"
        className="focus:shadow-outline mx-auto mt-4 max-w-xs rounded px-4 py-2 text-center font-bold text-white hover:underline focus:outline-none"
      >
        Edit Categories/Budget
      </Link>
      <WeekViewer
        session={session}
        getExpenses={getExpenses}
      />
      <ExpenseForm
        session={session}
        getCategories={getCategories}
        getExpenses={getExpenses}
      />

    </div>
  );
};
export default Expenses;
