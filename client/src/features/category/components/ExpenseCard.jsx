import formatMoney from "../../../utils/moneyFormatter";

const ExpenseCard = ({ expense }) => (
  <li key={expense.id}>
    <div className="block hover:bg-gray-50">
      <div className="px-4 py-1 sm:px-6">
        <div className="flex items-center justify-between">
          <p className="truncate text-sm font-medium text-indigo-600">
            {expense.name}
          </p>
          <div className="ml-2 flex flex-shrink-0">
            <p className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
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
export default ExpenseCard;
