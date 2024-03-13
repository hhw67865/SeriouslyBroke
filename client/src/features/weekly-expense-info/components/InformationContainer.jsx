import formatMoney from "../../../utils/moneyFormatter";

const InformationContainer = ({ weeklyExpenses }) => {
  const weeklyExpenseSummary = Object.entries(
    weeklyExpenses.reduce((acc, expense) => {
      if (!acc[expense.category.name]) {
        acc[expense.category.name] = {
          totalExpense: 0,
          color: expense.category.color,
        };
      }
      acc[expense.category.name].totalExpense += parseFloat(expense.amount);
      return acc;
    }, {}),
  )
    .map(([category, { totalExpense, color }]) => ({
      category,
      totalExpense,
      color,
    }))
    .sort((a, b) => b.totalExpense - a.totalExpense);
  return (
    <div className="mt-6 flex-grow rounded-md bg-gray-100 p-6 shadow-md">
      <div className="mb-4 border-b border-gray-200 pb-2">
        <h1 className="text-2xl font-bold text-gray-700">Weekly Summary</h1>
      </div>
      <ul className="space-y-2">
        {weeklyExpenseSummary.map((item, index) => (
          <li
            key={index}
            className="flex items-center justify-between rounded bg-white p-2 text-sm shadow"
          >
            <div className="flex items-center space-x-2">
              <div
                className="inline-block h-3 w-3 rounded-full"
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="font-semibold text-gray-600">
                {item.category}
              </span>
            </div>
            <span className="font-light text-gray-500">
              {formatMoney(item.totalExpense)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default InformationContainer;
