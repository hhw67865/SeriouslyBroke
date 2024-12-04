import formatMoney from "../../../utils/moneyFormatter";
import { useState } from "react";
import EditExpenseForm from "./EditExpenseForm";

const ExpenseCard = ({ expense, getExpenses, getCategories }) => {
  const [showEditModal, setShowEditModal] = useState(false);

  const handleClick = () => {
    setShowEditModal(true);
  };

  return (
    <>
      <li className="mb-3" onClick={handleClick}>
        <div className="cursor-pointer rounded-md border border-gray-100 bg-white p-3 shadow-sm transition-all duration-200 hover:shadow">
          <div className="flex items-center justify-between">
            <h3 className="flex-1 truncate pr-3 text-base font-medium text-gray-800">
              {expense.name}
            </h3>
            <p className="text-base font-semibold text-emerald-600">
              {formatMoney(expense.amount)}
            </p>
          </div>
          <div className="mt-2 flex items-center justify-between text-xs">
            <time
              dateTime={expense.date}
              className="flex items-center text-gray-500"
            >
              <svg
                className="mr-1 h-3 w-3 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                />
              </svg>
              {expense.date}
            </time>
            {expense.frequency && (
              <span className="rounded-full bg-gray-100 px-2 py-0.5 font-medium uppercase tracking-wide text-gray-600">
                {expense.frequency}
              </span>
            )}
          </div>
        </div>
      </li>
      {showEditModal && (
        <EditExpenseForm
          expense={expense}
          getExpenses={getExpenses}
          getCategories={getCategories}
          onClose={() => setShowEditModal(false)}
        />
      )}
    </>
  );
};

export default ExpenseCard;
