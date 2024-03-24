import { Link } from "react-router-dom";
import formatMoney from "../utils/moneyFormatter";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const MonthNavigation = ({ summaryMonth, setSummaryMonth }) => {
  const changeMonth = (monthsToAdd) => {
    setSummaryMonth(
      new Date(summaryMonth.setMonth(summaryMonth.getMonth() + monthsToAdd)),
    );
  };

  return (
    <div className="flex items-center justify-between text-gray-700">
      <button
        className="text-4xl font-extrabold"
        onClick={() => changeMonth(-1)}
      >
        &#8592;
      </button>
      <div className="text-2xl font-extrabold">
        {summaryMonth.toLocaleString("default", { month: "long" })}{" "}
        {summaryMonth.getFullYear()}
      </div>
      <button
        className="text-4xl font-extrabold"
        onClick={() => changeMonth(1)}
      >
        &#8594;
      </button>
    </div>
  );
};

const SummaryStatus = ({ summary }) => {
  const exceedingCategories = summary.exceeding_categories
    .map((category) => `${category.name} by ${formatMoney(category.overage)}`)
    .join(", ");

  const setupBudgetCategories = summary.missing_budget_categories.join(", ");

  return (
    <div className="p-4">
      <div className="mb-5 font-bold text-gray-700">
        {summary.status}
        <p>
          {parseFloat(summary.current_budget) <
          parseFloat(summary.total_expenses)
            ? `You are ${formatMoney(
                summary.total_expenses - summary.current_budget,
              )} past your budget.`
            : `You are under your budget by ${formatMoney(
                summary.current_budget - summary.total_expenses,
              )}.`}
        </p>
      </div>
      <div className="text-gray-600">
        <p>
          {summary.current_month
            ? `According to your budget, your expenses should be around ${formatMoney(
                summary.current_budget,
              )}. Your current expenses total to ${formatMoney(
                summary.total_expenses,
              )}.`
            : `Your budget is ${formatMoney(
                summary.current_budget,
              )}, your expenses total to ${formatMoney(
                summary.total_expenses,
              )}.`}
        </p>

        <p className="mt-4">
          {exceedingCategories &&
            `Categories that went over budget are: ${exceedingCategories}`}
        </p>
        <div className="mt-4 text-gray-600">
          {setupBudgetCategories && (
            <>
              <p>
                You still need to setup budgets for these categories:{" "}
                {setupBudgetCategories}
              </p>
              <Link to="/expenses/categories">
                <button className="mt-4 text-secondary hover:underline">
                  Setup My Budgets
                </button>
              </Link>
            </>
          )}
        </div>
        <div className="mt-4 text-gray-600">
          <div className="mb-5 font-bold text-gray-700">
            What happened? Take a closer look &#x1F440;
          </div>
          <OverBudgetCategoryButton />
        </div>
      </div>
    </div>
  );
};

const OverBudgetCategoryButton = ({ categories }) => {
  return (
    <>
      <button className="focus:tertiary inline-flex items-center rounded-md border border-transparent bg-secondary px-6 py-3 text-base font-medium text-white hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2">
        GROCERYASDASDASD sadasda
      </button>
    </>
  );
};

const SummaryChart = ({ summary }) => (
  <div className="p-4">
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={summary.graph_data}>
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="date" />
        <YAxis
          domain={[
            0,
            Math.ceil(
              Math.max(summary.total_budget, summary.total_expenses) / 100,
            ) * 100,
          ]}
        />
        <Line type="monotone" dataKey="total" stroke="red" dot={false} />
        <Line type="monotone" dataKey="budget" stroke="#5F741D" dot={false} />
        <Tooltip />
        <Legend />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

const Summary = ({ summary, summaryMonth, setSummaryMonth }) => {
  return (
    <div className="container mx-auto px-4">
      <div className="sticky top-24 z-50 mx-auto grid max-w-md grid-cols-1 gap-4 overflow-hidden rounded-lg bg-gray-100 p-4 shadow-lg">
        <MonthNavigation
          summaryMonth={summaryMonth}
          setSummaryMonth={setSummaryMonth}
        />
      </div>
      <div className="mt-8 grid grid-cols-1 gap-4 overflow-hidden rounded-lg bg-gray-100 p-4 shadow-lg md:grid-cols-2">
        <SummaryStatus summary={summary} />
        <SummaryChart summary={summary} />
      </div>
      <div className="mt-8 grid grid-cols-1 gap-4 overflow-hidden rounded-lg bg-gray-100 p-4 shadow-lg md:grid-cols-3">
        <div className="flex flex-col items-center justify-center p-4">
          <div className="font-bold text-gray-700">Expenses</div>
          <div className="text-gray-600">
            {formatMoney(summary.total_expenses)}
          </div>
        </div>
        <div className="flex flex-col items-center justify-center p-4">
          <div className="font-bold text-gray-700">Net Income</div>
          <div className="text-gray-600">
            {formatMoney(summary.total_income - summary.total_expenses)}
          </div>
        </div>
        <div className="flex flex-col items-center justify-center p-4">
          <div className="font-bold text-gray-700">Income</div>
          <div className="text-gray-600">
            {formatMoney(summary.total_income)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
