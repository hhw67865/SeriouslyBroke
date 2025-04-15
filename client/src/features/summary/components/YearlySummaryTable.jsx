import React, { useContext } from "react";
import formatMoney from "../../../utils/moneyFormatter";
import { ApiContext } from "../../../context/ApiContext";

const YearlySummaryTable = () => {
  const { yearlySummary } = useContext(ApiContext);

  if (!yearlySummary?.data) return null;

  return (
    <div className="mt-8">
      <h2 className="mb-4 text-xl font-semibold">Yearly Summary</h2>
      
      {/* Expenses Section */}
      <div className="mb-8">
        <h3 className="mb-2 text-lg font-medium">Expenses</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-200 text-xs text-gray-600 sm:text-sm">
                <th className="px-3 py-2 text-left sm:px-4">Category</th>
                <th className="px-3 py-2 text-right sm:px-4">Year to Date</th>
                <th className="px-3 py-2 text-right sm:px-4">Previous Year</th>
              </tr>
            </thead>
            <tbody className="text-xs text-gray-600 sm:text-sm">
              {yearlySummary.data.expenses.categories.map((category) => (
                <tr
                  key={category.name}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="whitespace-nowrap px-3 py-2 text-left sm:px-4">
                    {category.name}
                  </td>
                  <td className="px-3 py-2 text-right sm:px-4">
                    {formatMoney(category.year_to_date)}
                  </td>
                  <td className="px-3 py-2 text-right sm:px-4">
                    {formatMoney(category.previous_year)}
                  </td>
                </tr>
              ))}
              <tr className="border-t-2 border-gray-300 font-semibold">
                <td className="whitespace-nowrap px-3 py-2 text-left sm:px-4">
                  Total
                </td>
                <td className="px-3 py-2 text-right sm:px-4">
                  {formatMoney(yearlySummary.data.expenses.total.year_to_date)}
                </td>
                <td className="px-3 py-2 text-right sm:px-4">
                  {formatMoney(yearlySummary.data.expenses.total.previous_year)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Incomes Section */}
      <div>
        <h3 className="mb-2 text-lg font-medium">Incomes</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-200 text-xs text-gray-600 sm:text-sm">
                <th className="px-3 py-2 text-left sm:px-4">Source</th>
                <th className="px-3 py-2 text-right sm:px-4">Year to Date</th>
                <th className="px-3 py-2 text-right sm:px-4">Previous Year</th>
              </tr>
            </thead>
            <tbody className="text-xs text-gray-600 sm:text-sm">
              {yearlySummary.data.incomes.sources.map((source) => (
                <tr
                  key={source.name}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="whitespace-nowrap px-3 py-2 text-left sm:px-4">
                    {source.name}
                  </td>
                  <td className="px-3 py-2 text-right sm:px-4">
                    {formatMoney(source.year_to_date)}
                  </td>
                  <td className="px-3 py-2 text-right sm:px-4">
                    {formatMoney(source.previous_year)}
                  </td>
                </tr>
              ))}
              <tr className="border-t-2 border-gray-300 font-semibold">
                <td className="whitespace-nowrap px-3 py-2 text-left sm:px-4">
                  Total
                </td>
                <td className="px-3 py-2 text-right sm:px-4">
                  {formatMoney(yearlySummary.data.incomes.total.year_to_date)}
                </td>
                <td className="px-3 py-2 text-right sm:px-4">
                  {formatMoney(yearlySummary.data.incomes.total.previous_year)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default YearlySummaryTable; 