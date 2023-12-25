import { useEffect, useState } from "react";
import fetchAxios from "../../../lib/fetchAxios";
import getWeek from "../../../utils/getWeek";

const WeekViewer = ({ session, update, updateExpenses }) => {
  const [currentWeek, setCurrentWeek] = useState(() => {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    return startOfDay.getTime();
  });
  const [weeklyExpenses, setWeeklyExpenses] = useState([]);
  const [showDeleteButton, setShowDeleteButton] = useState({});
  const [editingExpenseId, setEditingExpenseId] = useState(null);
  const [editExpense, setEditExpense] = useState({
    name: "",
    amount: "",
  });

  useEffect(() => {
    fetchAxios(
      {
        method: "GET",
        url: "/api/expenses/week",
        params: { date: new Date(currentWeek) },
      },
      session,
    ).then((res) => {
      setWeeklyExpenses(res.data);
    });
  }, [currentWeek, update]);

  const handlePreviousWeek = () => {
    setCurrentWeek(currentWeek - 7 * 24 * 60 * 60 * 1000); // Subtract 7 days
  };

  const handleNextWeek = () => {
    setCurrentWeek(currentWeek + 7 * 24 * 60 * 60 * 1000); // Add 7 days
  };

  const startOfWeek = new Date(currentWeek);
  let dayOfWeek = startOfWeek.getDay();
  dayOfWeek = (dayOfWeek === 0 ? 7 : dayOfWeek) - 1; // Adjust for Monday start
  startOfWeek.setDate(startOfWeek.getDate() - dayOfWeek);
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(endOfWeek.getDate() + 6);

  const weekStart = startOfWeek.toLocaleDateString();
  const weekEnd = endOfWeek.toLocaleDateString();
  const weekNumber = getWeek(startOfWeek);

  function handleDelete(id) {
    fetchAxios({ method: "DELETE", url: `/api/expenses/${id}` }, session).then(
      () => {
        updateExpenses();
      },
    );
  }

  function handleExpenseChange(e) {
    setEditExpense({ ...editExpense, [e.target.name]: e.target.value });
  }

  function handleSubmitEdit(e) {
    e.preventDefault();
    fetchAxios(
      {
        method: "PUT",
        url: `/api/expenses/${editingExpenseId}`,
        data: editExpense,
      },
      session,
    )
      .then(() => {
        setEditingExpenseId(null);
        setEditExpense({ name: "", amount: "" });
        updateExpenses();
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="w-[90%] rounded-md bg-gray-100 p-6 shadow-md">
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
      <div className="mt-6 grid grid-cols-7 gap-1">
        {Array.from({ length: 7 }, (_, i) => {
          const date = new Date(startOfWeek);
          date.setDate(date.getDate() + i);
          const formattedDate = date.toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
          });
          const dailyExpenses = weeklyExpenses.filter(
            (expense) => expense.date === date.toISOString().split("T")[0],
          );
          return (
            <div
              key={i}
              className="divide-y divide-gray-200 rounded-md border border-gray-200 p-2 shadow-sm"
            >
              <h2 className="text-l mb-2 font-bold">{formattedDate}</h2>
              <div className="flex max-h-[300px] min-h-[300px] flex-col space-y-2 overflow-auto whitespace-normal break-words py-2">
                {dailyExpenses.map((expense, key) => (
                  <div
                    key={key}
                    className="divide-y rounded-md bg-white p-1 shadow-md"
                    onMouseEnter={() =>
                      setShowDeleteButton((prev) => ({
                        ...prev,
                        [expense.id]: true,
                      }))
                    }
                    onMouseLeave={() =>
                      setShowDeleteButton((prev) => ({
                        ...prev,
                        [expense.id]: false,
                      }))
                    }
                  >
                    {editingExpenseId !== expense.id ? (
                      <>
                        <h3 className="text-sm font-semibold">
                          {expense.name}
                        </h3>
                        <p className="text-sm">${expense.amount}</p>
                      </>
                    ) : (
                      <form onSubmit={handleSubmitEdit}>
                        <input
                          className="overflow-auto whitespace-pre-wrap bg-yellow-200 text-sm font-semibold"
                          value={editExpense.name}
                          name="name"
                          onChange={handleExpenseChange}
                        />
                        <input
                          className="bg-yellow-200 text-sm"
                          id="amount"
                          name="amount"
                          value={editExpense.amount}
                          onChange={handleExpenseChange}
                        />
                        <button
                          type="submit"
                          style={{ display: "none" }}
                        ></button>
                      </form>
                    )}

                    {showDeleteButton[expense.id] && (
                      <div className="flex justify-between px-2">
                        {editingExpenseId !== expense.id ? (
                          <button
                            className="text-xs text-secondary"
                            onClick={() => {
                              setEditingExpenseId(expense.id);
                              setEditExpense({
                                name: expense.name,
                                amount: expense.amount,
                              });
                            }}
                          >
                            Edit
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              setEditingExpenseId(null);
                              setEditExpense({ name: "", amount: "" });
                            }}
                            className="text-xs text-secondary"
                          >
                            Cancel
                          </button>
                        )}
                        <button
                          className="text-xs text-tertiary-dark"
                          onClick={() => handleDelete(expense.id)}
                        >
                          Remove
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="text-sm font-bold">
                {" "}
                Total: $
                {dailyExpenses
                  .reduce(
                    (total, expense) => total + parseFloat(expense.amount),
                    0,
                  )
                  .toFixed(2)}{" "}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default WeekViewer;
