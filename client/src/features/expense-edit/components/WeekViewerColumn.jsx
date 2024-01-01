import formatMoney from "../../../utils/moneyFormatter";
import ExpensesCard from "./ExpensesCard";

const WeekViewerColumn = ({
  formattedDate,
  dailyExpenses,
  editingExpenseId,
  session,
  setEditingExpenseId,
  getExpenses,
}) => {
  return (
    <div className="divide-y divide-gray-200 rounded-md border border-gray-200 p-2 shadow-sm">
      <h2 className="text-l mb-2 font-bold">{formattedDate}</h2>
      <div className="flex max-h-[300px] min-h-[300px] flex-col space-y-2 overflow-auto whitespace-normal break-words py-2">
        {dailyExpenses.map((expense, key) => (
          <ExpensesCard
            key={key}
            editingExpenseId={editingExpenseId}
            expense={expense}
            session={session}
            getExpenses={getExpenses}
            setEditingExpenseId={setEditingExpenseId}
          />
        ))}
      </div>
      <div className="text-sm font-bold">
        Total:{" "}
        {formatMoney(
          dailyExpenses.reduce(
            (total, expense) => total + parseFloat(expense.amount),
            0,
          ),
        )}
      </div>
    </div>
  );
};
export default WeekViewerColumn;
