import { useState, useContext } from "react";
import fetchAxios from "../../../lib/fetchAxios";
import formatMoney from "../../../utils/moneyFormatter";
import Errors from "../../../components/errors/Errors";
import formatAxiosErrors from "../../../utils/formatAxiosErrors";
import { ApiContext } from "../../../context/ApiContext";

const ExpensesCard = ({
  editingExpenseId,
  setEditingExpenseId,
  expense,
}) => {
  const apiCalls = useContext(ApiContext);
  const [errors, setErrors] = useState(null);
  const [showButtons, setShowButtons] = useState(false);
  const [editExpense, setEditExpense] = useState({
    name: "",
    amount: "",
  });

  function handleDelete(id) {
    fetchAxios({ method: "DELETE", url: `/api/expenses/${id}` }, apiCalls.session).then(
      () => {
        apiCalls.expenses.updateData();
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
      apiCalls.session,
    )
      .then(() => {
        setEditingExpenseId(null);
        setEditExpense({ name: "", amount: "" });
        apiCalls.expenses.updateData();
      })
      .catch((err) => setErrors(formatAxiosErrors(err)));
  }

  return (
    <div
      className="divide-y rounded-md border-2 bg-white p-1 shadow-md"
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
      <Errors errors={errors} />
    </div>
  );
};
export default ExpensesCard;
