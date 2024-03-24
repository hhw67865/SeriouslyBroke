import { useState, useMemo } from "react";
import EditCategoryForm from "./EditCategoryForm";

import DeleteCategoryForm from "./DeleteCategoryForm";
import formatMoney from "../../../utils/moneyFormatter";
import MonthSelector from "../../../components/date_selectors/MonthSelector";
import YearSelector from "../../../components/date_selectors/YearSelector";
import Pagination from "../../../components/Pagination";
import convertDate from "../../../utils/convertDate";

const ExpenseCard = ({ expense }) => (
  <li key={expense.id}>
    <div className="block hover:bg-gray-50">
      <div className="px-4 py-1 sm:px-6">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-indigo-600 truncate">{expense.name}</p>
          <div className="ml-2 flex-shrink-0 flex">
            <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
              {formatMoney(expense.amount)}
            </p>
          </div>
        </div>
        <div className="mt-1 sm:flex sm:justify-between">
          <p className="flex items-center text-sm text-gray-500">
            <time dateTime={expense.date}>{expense.date}</time>
          </p>
        </div>
      </div>
    </div>
  </li>
);

const FillerExpenseCard = () => (
  <div className="opacity-0">
    <ExpenseCard expense={{ id: 'filler', name: 'filler', amount: 'filler', date: 'filler' }} />
  </div>
);

const Filter = ({ isDescending, setIsDescending }) => (
  <div className="flex items-center space-x-2 py-2">
    <input 
      type="checkbox" 
      checked={isDescending} 
      onChange={() => setIsDescending(!isDescending)} 
      className="form-checkbox h-4 w-4 text-blue-600" 
    />
    <label className="text-sm font-light text-gray-700">Order by amount (descending)</label>
  </div>
);


const ExpensesContainer = ({ category }) => {
  const [month, setMonth] = useState('');
  const [year, setYear] = useState(new Date().getFullYear());
  const [currentPage, setCurrentPage] = useState(1);
  const [isDescending, setIsDescending] = useState(false);
  const itemsPerPage = 5;

  const filteredExpenses = useMemo(() => {
    let expenses = category.expenses.filter(expense => {
      const expenseDateObj = convertDate(expense.date);
      return (!month || expenseDateObj.month === Number(month)) && (!year || expenseDateObj.year === Number(year));
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
        <MonthSelector month={month} setMonth={setMonth} />
        <YearSelector year={year} setYear={setYear} />
        <Filter isDescending={isDescending} setIsDescending={setIsDescending} />
      </div>
      <h3 className="text-lg font-semibold mb-2">Expenses:</h3>
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {currentExpenses.length > 0 ? (
            <>
              {currentExpenses.map((expense) => (
                <ExpenseCard key={expense.id} expense={expense} />
              ))}
              {Array(fillerRows).fill().map((_, index) => (                
                <FillerExpenseCard key={index} />
              ))}
            </>
          ) : (
            <li className="px-4 py-4 sm:px-6 text-center text-gray-500">No expenses to display</li>
          )}
        </ul>
        {currentExpenses.length > 0 && (
          <Pagination itemsPerPage={itemsPerPage} data={filteredExpenses} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        )}
      </div>
    </div>
  );
}

const CategoryContainer = ({
  categoryId,
  session,
  getCategories,
  getExpenses,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const category = getCategories.data?.find(
    (category) => category.id === categoryId,
  );

  return (
    <>
      {category ? (
        <>
          <div
            className={`m-4 mx-auto max-w-md overflow-hidden rounded-xl border-4 bg-white shadow-md md:max-w-2xl`}
            style={{ borderColor: category.color }}
          >
            <div className="p-8">
              {!showForm ? (
                <>
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="mb-4 text-3xl font-extrabold">
                        {category.name}
                      </h2>
                    </div>
                    <button
                      onClick={() => setShowForm(true)}
                      className="rounded bg-white px-4 py-2 font-bold text-black hover:bg-gray-200"
                    >
                      Edit
                    </button>
                  </div>

                  <div className="flex flex-col">
                    <p className="my-2 text-gray-500">
                      <span className="font-bold">Current Month Total:</span>{" "}
                      {formatMoney(category.current_month_total)}
                    </p>
                    <p className="my-2 text-gray-500">
                      <span className="font-bold">Previous Month Total:</span>{" "}
                      {formatMoney(category.last_month_total)}
                    </p>
                    <p className="mt-2 text-gray-500">
                      <span className="font-bold">
                        Three Month Average Total:
                      </span>{" "}
                      {formatMoney(category.last_three_month_average)}
                    </p>
                    <p className="mt-2">
                      <span className="text-lg font-bold">Budget:</span>{" "}
                      {category.minimum_amount
                        ? formatMoney(category.minimum_amount)
                        : "No budget set yet."}
                    </p>
                    <button
                      onClick={() => setShowDeleteDialog(true)}
                      className="self-end rounded bg-white px-4 py-2 font-bold text-tertiary-dark hover:bg-gray-200"
                    >
                      Delete
                    </button>
                    <hr className="my-4 border-gray-200" />
                    <ExpensesContainer category={category} />
                  </div>
                </>
              ) : (
                <EditCategoryForm
                  session={session}
                  getCategories={getCategories}
                  setShowForm={setShowForm}
                  category={category}
                  getExpenses={getExpenses}
                />
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="rounded border bg-white p-4 shadow">
          <h2 className="mb-2 text-lg font-semibold">No Category Selected</h2>
          <p className="text-gray-600">
            Please select a Category from the list on the left.
          </p>
        </div>
      )}
      {showDeleteDialog && (
        <DeleteCategoryForm
          session={session}
          setShowDeleteDialog={setShowDeleteDialog}
          category={category}
          getCategories={getCategories}
          getExpenses={getExpenses}
          categoryId={categoryId}
        />
      )}
    </>
  );
};

export default CategoryContainer;
