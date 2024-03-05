import formatMoney from "../../../utils/moneyFormatter";

const WeeklyTotal = ({weeklyExpenses}) => {

  let weeklyTotal = weeklyExpenses.reduce((total, expense) => total + parseFloat(expense.amount), 0)

  return (
    <div className="flex px-4 pt-4">
      <h1 className="font-bold ml-auto">Total Weekly Expense: {formatMoney(weeklyTotal)}</h1>
    </div>
  );
}
export default WeeklyTotal;