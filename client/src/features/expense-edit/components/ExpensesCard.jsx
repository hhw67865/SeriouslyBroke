import { useState } from "react";
import fetchAxios from "../../../lib/fetchAxios";
import formatMoney from "../../../utils/moneyFormatter";

const ExpensesCard = ({
  editingExpenseId,
  setEditingExpenseId,
  expense,
  session,
  getExpenses
}) => {
  const [showButtons, setShowButtons] = useState(false);
  const [editExpense, setEditExpense] = useState({
    name: "",
    amount: "",
  });

  function handleDelete(id) {
    fetchAxios({ method: "DELETE", url: `/api/expenses/${id}` }, session).then(
      () => {
        getExpenses.updateData();
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
        getExpenses.updateData();
      })
      .catch((err) => console.log(err));
  }

  return (
    <div
      className="divide-y rounded-md bg-white p-1 shadow-md border-2"
      onMouseEnter={() => setShowButtons(true)}
      onMouseLeave={() => setShowButtons(false)}
      style={{ borderColor: expense.category.color }}
    >
      {editingExpenseId !== expense.id ? (
        <>
          <h3 className="text-sm font-semibold">{expense.name}</h3>
          <p className="text-sm">{formatMoney(expense.amount)}</p>
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
          <button type="submit" style={{ display: "none" }}></button>
        </form>
      )}

      {showButtons && (
        <div className="flex justify-between px-2">
          {editingExpenseId !== expense.id ? (
            <button
              className="text-xs text-secondary hover:text-primary"
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
            className="text-xs text-tertiary-dark hover:text-tertiary-light"
            onClick={() => handleDelete(expense.id)}
          >
            Remove
          </button>
        </div>
      )}
    </div>
  );
};
export default ExpensesCard;
