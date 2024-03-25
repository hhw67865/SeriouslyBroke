import formatMoney from "../../../utils/moneyFormatter";
import { Link } from "react-router-dom";
import OverBudgetCategoryButton from "./OverBudgetCategoryButton";

const SummaryStatus = ({ summary, summaryMonth }) => {
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
          {summary.exceeding_categories.map((category, id) => (
            <OverBudgetCategoryButton key={id} category={category} summaryMonth={summaryMonth} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SummaryStatus;