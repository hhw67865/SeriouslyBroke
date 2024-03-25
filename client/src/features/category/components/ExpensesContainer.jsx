import { useSearchParams } from "react-router-dom";
import { useMemo } from "react";
import convertDate from "../../../utils/convertDate";
import MonthSelector from "../../../components/date_selectors/MonthSelector";
import YearSelector from "../../../components/date_selectors/YearSelector";
import Filter from "./Filter";
import ExpenseCard from "./ExpenseCard";
import FillerExpenseCard from "./FillerExpenseCard";
import Pagination from "../../../components/Pagination";

const ExpensesContainer = ({ category }) => {
  const [searchParams] = useSearchParams();
  const month = Number(searchParams.get("month")) || "";
  const year = Number(searchParams.get("year")) || new Date().getFullYear();
  const currentPage = Number(searchParams.get("page")) || 1;
  const isDescending = searchParams.get("isDescending") === "true" || false;
  const itemsPerPage = 5;

  const filteredExpenses = useMemo(() => {
    let expenses = category.expenses.filter((expense) => {
      const expenseDateObj = convertDate(expense.date);
      return (
        (!month || expenseDateObj.month === month) &&
        (!year || expenseDateObj.year === year)
      );
    });

    if (isDescending) {
      expenses.sort((a, b) => b.amount - a.amount);
    }

    return expenses;
  }, [category.expenses, month, year, isDescending]);

  const currentExpenses = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredExpenses.slice(startIndex, endIndex);
  }, [filteredExpenses, currentPage, itemsPerPage]);

  const fillerRows = itemsPerPage - currentExpenses.length;

  return (
    <div className="mt-5">
      <div className="mb-5 flex space-x-4">
        <MonthSelector month={month} />
        <YearSelector year={year} />
        <Filter isDescending={isDescending} />
      </div>
      <h3 className="mb-2 text-lg font-semibold">Expenses:</h3>
      <div className="overflow-hidden bg-white shadow sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {currentExpenses.length > 0 ? (
            <>
              {currentExpenses.map((expense) => (
                <ExpenseCard key={expense.id} expense={expense} />
              ))}
              {Array(fillerRows)
                .fill()
                .map((_, index) => (
                  <FillerExpenseCard key={index} />
                ))}
            </>
          ) : (
            <li className="px-4 py-4 text-center text-gray-500 sm:px-6">
              No expenses to display
            </li>
          )}
        </ul>
        {currentExpenses.length > 0 && (
          <Pagination
            itemsPerPage={itemsPerPage}
            data={filteredExpenses}
            currentPage={currentPage}
          />
        )}
      </div>
    </div>
  );
};
export default ExpensesContainer;
