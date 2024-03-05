import formatMoney from "../../../utils/moneyFormatter";

const InformationContainer = ({weeklyExpenses}) => {

  const weeklyExpenseSummary = Object.entries(
    weeklyExpenses.reduce((acc, expense) => {
      if (!acc[expense.category.name]) {
        acc[expense.category.name] = { totalExpense: 0, color: expense.category.color };
      }
      acc[expense.category.name].totalExpense += parseFloat(expense.amount);
      return acc;
    }, {})
  ).map(([category, { totalExpense, color }]) => ({ category, totalExpense, color }))
  .sort((a, b) => b.totalExpense - a.totalExpense);

  console.log(weeklyExpenseSummary)

  return (
    <div className="mt-6 rounded-md bg-gray-100 p-6 shadow-md flex-grow">
    <div className="mb-4 border-b border-gray-200 pb-2">
      <h1 className="text-2xl font-bold text-gray-700">Weekly Summary</h1>
    </div>
    <ul className="space-y-2">
      {weeklyExpenseSummary.map((item, index) => (
        <li key={index} className="flex justify-between items-center bg-white p-2 rounded shadow text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full inline-block" style={{ backgroundColor: item.color }}></div>
            <span className="font-semibold text-gray-600">{item.category}</span>
          </div>
          <span className="font-light text-gray-500">{formatMoney(item.totalExpense)}</span>
        </li>
      ))}
    </ul>
  </div>
  );
}
export default InformationContainer;